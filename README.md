# APIREST OrkutAngular
## Sobre o projeto
  Esta API é parte da aplicação [Orkut Angular](https://github.com/GabriellPassos/OrkutAngular), um clone da saudosa rede social. 
  Atuando no back-end, é responsável por tratar todas as requisições feitas pelos usuários. Foi construída sob o framework Express com NodeJS.

## Tecnologias utilizadas
- NodeJS
- JWT
- Express
- Sequelize
- MySQL

## Rotas
### Registro
  Registro de usuário.
| Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `POST`      | /registro    |Cria um novo usuário.|
#### Exemplo:
```Json
{
    "nomeUsuario": "exemplo"
    "email": "exemplo@exemplo.com",
    "emailConfirmacao": "exemplo@exemplo.com",
    "senha": "exemplo123",
    "senhaConfirmacao": "exemplo123",
    "aniversario": "1111-11-11"
}
```
### Login
  Login com usuário existente.
| Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `POST`      | /login     |Acessa a sessão de um usuário. |
#### Exemplo:
```Json
{
    "email": "exemplo@exemplo.com",
    "senha": "exemplo123",
}
```
### Perfil
  Contaladora perfil é resposável pelos dados de exibição do usuario, como: nome, gostos pessoais, foto de perfil, etc.<br>
  
  | Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `GET`     | /perfil      | Busca perfil ativo na  sessão atual.|
| `GET`      | /perfil/:nomeUsuario    |Busca por nome de usuário.|
| `PATCH`      | /perfil      | Atualiza dados do perfil. |
#### Exemplo:
  ```json
{
    "id": 2,
    "fotoPerfil": "assets/imagens/MarkZuckerberg.jpg",
    "nomePerfil": "Marcos Zukerberg",
    "frasePerfil": "se a versão é melhor que a original, publique a versão!",
    "genero": "masculino",
    "estado": "RO",
    "cidade": "Cabixi",
    "quemSouEu": "o pesadelo dos seus pais, prazer. amor da sua vida. ;)",
    "relacionamento": "casado(a)",
    "livros": "Facebook",
    "musicas": "Alcione - Você me vira a cabeça",
    "filmes": "Viagem ao centro da terra", 
}
```

### Álbum
  | Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `POST`      | /album    |Cria um novo álbum.|
| `GET`     | /album      | Busca todos os albuns do usuário ativo na sessão atual.|
| `GET`      | /album/:nomeUsuario      | Busca todos os albuns vinculados ao nome de usuário. |
| `GET`      | /album/:nomeUsuario/:albumId      | Busca um album por ID. |
| `PATCH`      | /album/:albumId      | Atualiza o album. (Adicionar foto e editar titulos) |
| `DELETE`   | /album/:albumId       |  Remove um álbum por ID.|
#### Exemplo:
  ```json
{
    "id": 1,
    "titulo": "meu primeiro álbum",
    "usuarioId": 1,
    "fotos": []
}
```

### Foto 
| Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `GET`      | /foto/:nomeFoto    |Busca uma imagem seu pelo nome.|
| `DELETE`   |  /foto/:fotoId      |Remove imagem pelo seu ID.|
#### Exemplo:
```json
{
    "id": 1,
    "nomeFoto": "file_8d3a82cf-8624-4590-b1f5-a99fbe4f8d5d.jpg",
    "titulo": "sem titulo",
    "albumId": 1,
    "usuarioId": 1,
    "recadoId": null
}
```

### Recado  
| Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `POST`      | /recados/:nomeUsuario    |Cria um novo recado, passando nome de usuário (destinatário).|
| `GET`      | /recados/:nomeUsuario      | Busca todos os recados recebidos vinculados ao nome de usuário. |
| `GET`     | /recados      | Busca todos os recados do usuário ativo na sessão atual.|
| `DELETE`   |  /recados/:recadoId      |Remove recado por ID.|
#### Exemplo:
```Json
{
    "nomePerfil": "exemplo",
    "nomeUsuario": "exemplo",
    "fotoPerfil": null,
    "destino": "exemplo-destino",
    "mensagem": "bom dia!",
    "createdAt": "2023-07-17T23:27:39.000Z"
}
```
### Perfil Info
| Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `GET`      | /perfilInfo    |Retorna os valores de reputação do usuário.|
#### Exemplo:
```Json
{
    "quantidadeFotos": 1,
    "quantidadeRecados": 0
}
```
### Token
| Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `GET`      | /verificarToken   |Verifica se o token enviado é válido.|

## Diagrama do banco de dados
![Diagrama do banco de dados](https://github.com/GabriellPassos/assets/blob/main/orkutangular/diagramaBancoDeDados.png)

# Como executar o projeto
Pré-requisitos: npm
```bash
# clone o repositório da APIREST

gh repo clone GabriellPassos/APIREST-OrkutAngular

#localize o arquivo environment

#altere com suas informações de conexão com banco de dados(HOST, USER, PASS)
```
![environment](https://github.com/GabriellPassos/assets/blob/main/orkutangular/environment.PNG)
```bash
# execute o servidor

$ npm start
```
# Autor
[Gabriel Silva Passos](https://www.linkedin.com/in/gabrielsilvapassos/)

