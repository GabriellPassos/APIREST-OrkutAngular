# APIREST OrkutAngular
## Sobre o projeto
  Esta API é parte da aplicação [Orkut Angular](https://github.com/GabriellPassos/OrkutAngular), um clone da saudosa rede social. 
  Atuando no back-end, é responsável por tratar todas as requisições feitas pelos usuários. Foi construída sob o framework Express com NodeJS.


## Funcionaliades
## Perfil
# Tecnologias utilizadas
- NodeJS
- JWT
- Express
- Sequelize
- MySql


## Diagrama do banco de dados
![Diagrama do banco de dados](https://github.com/GabriellPassos/assets/blob/main/orkutangular/diagramaBancoDeDados.png)
| Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `GET`     | /perfil      | Busca perfil ativo na  sessão atual.|
| `GET`      | /perfil/:nomeUsuario    |Busca por nome de usuário.|
| `PATCH`      | /perfil      | Atualiza dados do perfil. |
###
| Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `POST`      | /album    |Cria um novo álbum.|
| `GET`     | /album      | Busca todos os albuns do usuário ativo na sessão atual.|
| `GET`      | /album/:nomeUsuario      | Busca todos os albuns vinculados ao nome de usuário. |
| `GET`      | /album/:nomeUsuario/:albumId      | Busca um album por ID. |
| `PATCH`      | /album/:albumId      | Atualiza o album. (Adicionar foto e editar titulos) |
| `DELETE`   | /album/:albumId       |  Remove um álbum por ID.|

| Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `GET`      | /foto/:nomeFoto    |Busca uma imagem por nome.|
| `DELETE`   |  /foto/:fotoId      |Remove imagem por ID.|

| Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `POST`      | /recados/:nomeUsuario    |Cria um novo recado, passando nome de usuário (destinatário).|
| `GET`      | /recados/:nomeUsuario      | Busca todos os recados recebidos vinculados ao nome de usuário. |
| `GET`     | /recados      | Busca todos os recados do usuário ativo na sessão atual.|
| `DELETE`   |  /recados/:recadoId      |Remove recado por ID.|

| Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `GET`      | /perfilInfo    |Retorna os valores de reputação do usuario.|

| Método     | Rota           | Descrição|
| :---       |:---           |:---|
| `GET`      | /verificarToken   |Verifica se o token enviado é válido.|
