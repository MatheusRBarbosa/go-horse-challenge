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

Um arquivo de configuração exemplo contendo esses pontos pode ser encontrado em `exemplos/docker-compose.yml`

## Funcionalidades da API
Em breve

## Teste de carga
Em breve

