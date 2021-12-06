import Button from '@restart/ui/esm/Button';
import { render } from '@testing-library/react';
import React from 'react'

export default class ModalComponent extends React.Component {

render() {
let modelStyle = {
display: 'block',
backgroundColor: 'rgba(0,0,0,0.8)'
}

return (

<div className="modal" style={modelStyle}>
  <div className="modal-dialog" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Crear Nuevo Usuario</h5>
        <button type="button" className="close"aria-label="Close" onClick={this.openModal}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
        <div className="row">
            <div className="col-md-6">
                <label className="col-form-label">Nombre:</label>
                <input type="text" className="form-control" id="name" placeholder="Ingresa tu nombre" />
            </div>
            <div className="col-md-6 ms-auto"> <label>Apellidos:</label>
                <input type="text" className="form-control" id="email" 
                    placeholder="Ingresa tu email" />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <label className="col-form-label">Fecha de Nacimiento:</label>
                <input type="date" className="form-control" id="fechaPago"  />
            </div>
        </div>
    </form>
      </div>
      <div className="modal-footer">
        <Button type="button" className="btn btn-secondary" >Close</Button>
        <Button type="button" className="btn btn-warning">Save changes</Button>
      </div>
    </div>
  </div>
</div>

);
}
}