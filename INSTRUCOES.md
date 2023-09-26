# Instruções para participar
Para participar, basta criar PR com uma pasta com o seu @ do github dentro de `participantes`. Dentro dessa pasta deve conter:
1. Um docker compose para que sua aplicação seja testada (a seguir detalharemos melhor as configurações)
2. Um arquivo README.md com o seu nome, github e qualquer outra informação que considere relevante
3. (OPCIONAL) Qualquer outro arquivo de configuração que seja usado no seu `docker-compose.yml`

## Docker-compose
Você pode ter quaisquer serviços no docker-compose, entretanto, ele precisa seguir algumas especificações.

1. Sua API precisa estar exposta para a porta 9999. Pois a máquina de teste possui essa porta configurada
2. Seu `docker-compose` precisa limitar os recursos com um total de 2vCPUs e 4 GBs RAM
3. As imagens que forem usadas no `docker-compose` (incluindo da sua API), precisam estar disponíveis em um registry público para que a máquina de teste possa fazer o pull corretamente.
4. Seu banco de dados precisa estar configurado.

Um arquivo de configuração exemplo contendo esses pontos pode ser encontrado em `exemplos/docker/docker-compose.yml`

## Funcionalidades da API
Sua API precisa responder aos seguinte endpoints:
- `[POST] /users` - criar um usuário
- `[GET] /users/:id` - buscar um usuário
- `[GET] /users?s=:search` - buscar usuários por um termo
- `[GET] /count/users` - retornar total de usuários na banco

### Criar usuário
Esse endpoint deve receber um payload que terá o seguinte formato:
Campo | Tipo | Validações
:-----: | :----: | ---------
nickname | string | Obrigatório, máximo de 32, único
name | string | Obrigatório, máximo de 255
birthDate | date | Obrigatório
stack | array de strings | Opcional

Tanto as tipagens quanto as validações serão testadas durante o teste de carga, ou seja, pode ser que no campo `stack` seja enviado algum número inteiro dentro da lista que deveria ser apenas de strings, ou por exemplo, seja enviado um `nickname` que já foi inserido na base. Nesses casos onde a alguma validacão falhe, o endpoint deve retornar status code `422`. Caso tudo passe corretamente, deve retornar `201`.

### Buscar um usuário
No endpoint será passado um ID de um usário que foi inserido. O endpoint deve retornar o registro daquele ID.

### Buscar usuário por termo
No endpoint será passado um queryParam, `s=<valor>`. O valor da busca deve procurar em todos os registros inseridos dentro dos campos `nickname`, `name` e `stack`, a resposta deve se limitar aos primeiros 50 registros. Caso não seja passado nenhum valor na busca, o endpoint deve retornar os registros sem filtragem, ou seja, apenas os 50 primeiros. 

### Retornar total de usuários
Esse endpoint será usado apenas uma vez ao final do teste para verificar quantos usuários foram inseridos na base. Ele retornar status code 200 com o corpo da resposta:

```json
{
   "total": <total inserido na base>
}
```

## Teste de carga
O teste de caraga usado será o mesmo que se encontra em `exemplos/k6/script.js`, usando as mesmas dependências (`chance.min.js` e `languages.min.js`) fique a vontade para usar os mesmos arquivos. Caso encontre algum problema não exite em mandar no canal de comunicação =).
O script usa a ferramenta [k6](https://k6.io/) para o teste de carga, você pode usar localmente, basta criar uma conta e configurar o CLI. 

