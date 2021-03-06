import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Warrior extends Component {
  constructor(props) {
    // construtor do componente warrior
    super(props);

    // Declarando o seu estado e atributos
    this.state = {
      nome: "",
      idade: "",
      habilidades: "",
      atributos: ""
    };

    // Essas linhas são importantes para o react, pois isso que faz os inputs serem "digitaveis"
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Método para definir a alteração do estado do componente que o input estiver relacionado
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Método roda quando se clica no onSubmit, no form
  onSubmit = event => {
    // Previnir de rodar esse método com "nada"
    event.preventDefault();

    // Post request para o upgrade do warrior
    axios.post(`/warriors/${this.props.match.params.id}`, {
      nome: this.state.nome,
      idade: this.state.idade,
      habilidades: this.state.habilidades,
      atributos: this.state.atributos
    });

    // Após concluir a post request, redireciona o user para a rota /warriors
    this.props.history.push("/warriors");
  };

  // Método que diz o que roda toda vez que o componente for "montado" na tela.
  componentDidMount() {
    // Get resquest para receber dados daquele unico warrior
    axios.get(`/warriors/${this.props.match.params.id}`).then(res => {
      // Os dados dele vão para o estado do componente, fazendo assim os inputs já ficarem com o "value", que nada mais são que dados antigos
      this.setState({
        nome: res.data.nome,
        idade: res.data.idade,
        habilidades: res.data.habilidades.join(","), // as funções "join", são para adicionar a vírgula entre os itens do array
        atributos: res.data.atributos.join(",") // e também transforma o array em uma string só.
      });
    });
  }

  // Método render, contém o JSX do componente
  render() {
    return (
      <div className="warriorCont">
        <h1 className="titles pb-3">Warrior Update</h1>
        <form onSubmit={this.onSubmit} className="mt-3">
          <h5>Nome</h5>
          <input
            type="text"
            name="nome"
            onChange={this.onChange}
            value={this.state.nome}
            className="mb-2 w-25"
          />
          <h5 className="mb-2">Idade</h5>
          <input
            type="number"
            name="idade"
            value={this.state.idade}
            onChange={this.onChange}
            className="mb-2"
          />

          <h5> Habilidades (Separar com vírgula)</h5>
          <input
            type="text"
            name="habilidades"
            value={this.state.habilidades}
            onChange={this.onChange}
            className="mb-2 w-25"
          />

          <h5> Atributos (Separar com vírgula)</h5>
          <input
            type="text"
            name="atributos"
            value={this.state.atributos}
            onChange={this.onChange}
            className="mb-2 w-25"
          />
          <br />
          <button className="btn btn-primary">Update</button>
        </form>
      </div>
    );
  }
}
// Se não tivesse a funcionalidade de redirecionar para a rota /warriors, não precisaria do "withRouter" na frente do nome da classe do componente a ser exportada.
export default withRouter(Warrior);
