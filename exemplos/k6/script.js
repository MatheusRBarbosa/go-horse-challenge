import http from "k6/http";
import { check, sleep } from "k6";
import * as chance from "./chance.min.js";
import { randomLanguage, randomStack } from "./languages.min.js";

const c = chance.Chance();
const userIds = [];

function makeUser() {
  const person = {
    nickname: `${c.first()}_${c.word({ length: 10 })}`.toLowerCase(),
    name: c.name(),
    birthDate: c.birthday(),
    stack: randomStack(c),
  };

  return person;
}

function makeTerm() {
  const factories = [
    () => c.first().toLowerCase(),
    () => c.name(),
    () => randomLanguage(c),
  ];

  const randomFactory =
    factories[c.integer({ min: 0, max: factories.length - 1 })];

  return randomFactory();
}

export const options = {
  ext: {
    loadimpact: {
      projectID: 3656055,
      name: "GHC: barbosa",
    },
  },
  stages: [{ duration: "3s", target: 1 }],
};

const baseUrl = "http://localhost:9999";

export default function () {
  createUser();
  sleep(1);

  getUser();
  sleep(1);

  searchTerm();
  sleep(1);
}

const getUser = () => {
  const randomId = userIds[Math.floor(Math.random() * userIds.length)];
  let res = http.get(`${baseUrl}/api/users/${randomId}`, {
    verb: "get",
    tags: { name: "Get user" },
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = JSON.parse(res.body);

  check(res, {
    "status is 200": (r) => r.status === 200 && body.id === randomId,
  });
};

const createUser = () => {
  let user = makeUser();

  let res = http.post(`${baseUrl}/api/users`, JSON.stringify(user), {
    verb: "post",
    tags: { name: "Criação" },
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 201) {
    const body = JSON.parse(res.body);
    userIds.push(body.id);
  }

  check(res, {
    "status is 201": (r) => r.status === 201,
  });
};

const searchTerm = () => {
  let randomTerm = makeTerm();
  let finded = false;
  let res = http.get(`${baseUrl}/api/users?s=${randomTerm}`, {
    verb: "get",
    tags: { name: "Busca" },
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    const body = JSON.parse(res.body);
    finded = body.name.includes(randomTerm);
    finded = finded || body.nickname.includes(randomTerm);
    body.stack.map((s) => {
      finded = finded || s.includes(randomTerm);
    });
  }

  check(res, {
    "term finded": () => finded,
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
};
