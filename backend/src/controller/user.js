const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "exemplo";
const SALT_VALUE = 10;

class UserController {
  async createUser(nome, email, senha, role) {
    if (!nome || !email || !senha) {
      throw new Error("Nome, email e senha são obrigatórios.");
    }

    const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE)
    await this.verificaEmail(email);
  
    const userValue = await user.create({
      nome,
      email,
      senha: cypherSenha,
      role: role || "viewer",
    });

    return userValue;
  }

  async findUser(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    const userValue = await user.findByPk(id);
    
    if (!userValue) {
      throw new Error("Usuário não encontrado.");
    }

    return userValue;
  }

  async update(id, nome, email, senha, userLogged, role) {
    const usuarioBase = await user.findByPk(id);
    if (!usuarioBase) {
      throw new Error("Usuário não encontrado.");
    }

    if (userLogged && userLogged.role !== "admin" && userLogged.id !== id) {
      throw new Error("Sem permissão.");
    }

    await this.verificaEmail(email, id);
    usuarioBase.nome = nome || usuarioBase.nome;
    usuarioBase.email = email || usuarioBase.email;
    usuarioBase.senha = senha ? await bcrypt.hash(String(senha), SALT_VALUE) : usuarioBase.senha;
    usuarioBase.role = role;
    
    usuarioBase.save();

    return usuarioBase;
  }

  async delete(id, userLogged) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    const usuario = await this.findUser(id);

    if (userLogged && userLogged.role !== "admin" && userLogged.id !== id) {
      throw new Error("Sem permissão.");
    }
    usuario.destroy();

    return;
  }

  async find() {
    return user.findAll();
  }

  async login(email, senha) {
    if (email === undefined || senha === undefined) {
      throw new Error("Email e senha são obrigatórios.");
    }

    const userValue = await user.findOne({ where: { email } });

    if (!userValue) {
      throw new Error("[1] Usuário e senha inválidos.");
    }

    const senhaValida = bcrypt.compare(String(senha), userValue.senha);
    if (!senhaValida) {
      throw new Error("[2] Usuário e senha inválidos.");
    }

    console.log(userValue.role);

    return jwt.sign({ id: userValue.id, role: userValue.role }, SECRET_KEY, { expiresIn: 60 * 60 });
  }

  async verificaEmail(email, id) {
    if (email) {
      const mesmoEmail = await user.findOne({ where: { email } });
      if (mesmoEmail && (!id || mesmoEmail.id != id)) {
        throw new Error("Email já cadastrado.");
      }
    }
  }

  async bloquear(id, userLogged) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }

    const usuario = await this.findUser(id);

    if (userLogged && userLogged.role !== "admin") {
      throw new Error("Sem permissão.");
    }

    usuario.bloqueado = true;
    usuario.save();

    return usuario;
  }

  async desbloquear(id, userLogged) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }

    const usuario = await this.findUser(id);

    if (userLogged && userLogged.role !== "admin") {
      throw new Error("Sem permissão.");
    }

    usuario.bloqueado = false;
    usuario.save();

    return usuario;
  }
}

module.exports = new UserController();
