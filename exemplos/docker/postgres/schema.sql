CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE TABLE
    IF NOT EXISTS public.users (
        id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
        nickname varchar(32) UNIQUE NOT NULL,
        "name" varchar(100) NOT NULL,
        birthdate date NOT NULL,
        stack text NULL,
        search text NOT NULL
    );