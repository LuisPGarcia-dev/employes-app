import TableComponent from "../../components/table/table-component";
import React from 'react';
import axios from "axios";
import Button from '@restart/ui/esm/Button';

import  './employes.sass'
const url = 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/luis_perez'


export default class EmployesPage extends React.Component {


constructor(props){
super(props);

this.state ={
data: [],
open: false,
firstname: '',
lastname: '',
datebirth: '',
validaterror: '',
validatename: false,
validatelastname: false,
validatebirth: false
};
}



getEmployes = () => {
axios.get(url).then(response => {
if(response.data.success === true) {
this.setState({data: response.data.data.employees});
console.log(this.state, response.data.data.employees)
}
})
}


componentDidMount() {
this.getEmployes();
}

openModal = () => {
this.setState({open: !this.state.open})
this.setState({validatename: false, validatelastname: false, validatebirth: false, firstname: '', datebirth: '', lastname: ''})
}

// Se hizo una validacion rapida solo con state, se pudo haber implementado que campos faltan
// se considerara a futuro ya que fue poco el tiempo que se pudo invertir
saveEmploye = (e) => {
  e.preventDefault();
  this.setState({validatename: true, validatelastname: true, validatebirth: true})
  if(this.state.firstname === "" || this.state.lastname === ""|| this.state.datebirth === "") {
    this.setState({validaterror: 'some'})
    alert("Faltan Datos por llenar");
  } else {
    const data = {name: this.state.firstname, last_name: this.state.lastname, birthday:this.state.datebirth}
    axios.post(url, data).then(response => {
      if(response.data.success) {
        console.log("Post", this.state, response.data.success);
        this.getEmployes();
      }
    })
    this.setState({open: false})
  }

}


handleChange = event => {
  const { value, name } = event.target;

  this.setState({[name]: value})
}


render() {

let modelStyle = {
display: 'block',
backgroundColor: 'rgba(0,0,0,0.8)'
}

return (
<div>
  <div className="d-flex justify-content-around mt-3">
    <Button className="btn btn-warning" onClick={this.openModal}>Crear Usuario</Button>
  </div>
  <TableComponent employees={this.state.data} />
  {
  this.state.open ?
  <div className="modal" style={modelStyle}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Crear Empleado</h5>
          <button type="button" className="close" aria-label="Close" onClick={this.openModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="row">
              <div className="col-md-6">
                <label >Nombre:</label>
                <input type="text" className="form-control" name="firstname" id="name" placeholder="Ingresa tu nombre" 
                onChange={this.handleChange}  required maxLength="30"/>
                <div>
                  {
                    this.state.validatename === true ? (
                    this.state.firstname === "" ? (
                      <p className="d-flex flex-row-reverse">* Campo Requerido</p>
                    ) : '') : ''
                  } 
                </div>
              </div>
              <div className="col-md-6"> 
                <label>Apellidos:</label>
                <input type="text" className="form-control" name="lastname" id="lastname" placeholder="Ingresa tus apellidos"
                 onChange={this.handleChange}  required maxLength="30"/>
                  <div>
                  {
                    this.state.validatelastname === true ? (
                    this.state.lastname === "" ? (
                      <p className="d-flex flex-row-reverse">* Campo Requerido</p>
                    ) : '') : ''
                  } 
                  </div>
              </div>
            </div>
            <div className="row margin-top-3">
              <div className="col-md-6">
                <label >Fecha de Nacimiento:</label>
                <input type="date" className="form-control" id="dateBirth" name="datebirth"
                 onChange={this.handleChange}  required/>
                  <div>
                  {
                    this.state.validatebirth === true ? (
                    this.state.datebirth === "" ? (
                      <p className="d-flex flex-row-reverse">* Campo Requerido</p>
                    ) : '') : ''
                  } 
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <Button type="button" className="btn btn-secondary" onClick={this.openModal}>Close</Button>
          <Button type="submit" className="btn btn-warning" onClick={this.saveEmploye}>Save changes</Button>
        </div>
      </div>
    </div>
  </div>
  : ''
  }
</div>
)
};
}