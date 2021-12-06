import React from 'react';
import axios from "axios";
import Button from '@restart/ui/esm/Button';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import  './group.styles.sass'
const url = 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/groups/luis_perez'
const urlEmployesByGroup = 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/luis_perez/getByGroup?id='

export default class GroupsPage extends React.Component {

  constructor(props){
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this);

  }

  state = {
    data: [],
    dataGroup: [],
    employesByGroup: [],
    showingItems: [],
    checkedEmployees: [],
    checkedAll: true
  }

  onDragEnd(result) {
      if(result.destination !== null) {
        if (result.destination.droppableId === 'characters2') {
          this.getEmployesByGroup(result.draggableId);
        }
        if(result.destination.droppableId === 'characters3' && result.source.droppableId === 'characters') {
          document.getElementById(result.draggableId).remove();
        }
      }
  }

  getEmployesByGroup = (param) => {
    if(!this.state.showingItems.includes(param)) {    
      axios.get(urlEmployesByGroup + param).then(response => {
        if(response.data.success === true) {
          this.setState({employesByGroup: this.state.employesByGroup.concat(response.data.data.employees),
                        showingItems: this.state.showingItems.concat(param),
                        checkedEmployees: this.state.employesByGroup.concat(response.data.data.employees)});
        }
      }).catch(error => alert("SOLO EXISTEN DATOS EN EL ID 1 y 2 (FRONDEND,BACKEND) - Error response ->" + error));
    } else {
    }
  }
  
  getGroups = () => {
    axios.get(url).then(response => {
      if(response.data.success === true) {
        this.setState({data: response.data.data.groups});
        console.log(this.state.data, response.data)
      }
    })
  }

  getEmployees = () => {
    console.log('EMPLEADOS CHEQUEADOS',this.state.checkedEmployees);
  }

  componentDidMount() {
    this.getGroups();
  }

  handleCheckbox(e) {
    if(e.target.checked) {
      this.setState((prevstate) => ({
        checkedEmployees: prevstate.checkedEmployees.concat(this.state.employesByGroup.filter(elem =>
          elem.id.toString() === e.target.id))
      }));
    } else {
      this.setState((prevstate) => ({
        checkedEmployees: prevstate.checkedEmployees.filter((elem) => elem.id.toString() !== e.target.id)
      }));
    }
  }

  filterGroups = (e) => {
    e.preventDefault();
    if(e.target.value !== '') {
      const finded = this.state.data.filter(object => Object.keys(object).some(key => 
          String(object[key]).toLowerCase().includes(e.target.value.toLowerCase())))
      this.setState({dataGroup: finded})
    } else {
      this.setState({dataGroup: []})
    }
  }

  render () {

    const { data, employesByGroup, dataGroup } = this.state

    return (
      <div>
        {/* <div><Button>Borrar Grupo</Button></div> */}
        <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="d-flex justify-content-around">
          <Droppable droppableId="characters">
          {(provided) => (
            <div className="characters" {...provided.droppableProps}  ref={provided.innerRef}>
              <input className="ms-3" type="text" onChange={this.filterGroups} placeholder="Buscar"/>
              {
              dataGroup.length > 0 ? dataGroup.map((group, index) => (
                  <Draggable key={`${group.id}`}draggableId={`${group.id}`} index={index}>
                    {(provided) => (
                      <div {...provided.draggableProps}  {...provided.dragHandleProps} ref={provided.innerRef} >
                        <div className="card text-white bg-primary mb-3" id={`${group.id}`}>
                          <div className="card-body">
                            <h5 className="card-title">
                              {group.name}
                            </h5>
                          </div>
                        </div>
                      </div> 
                    )}
                  </Draggable>   
              )) :
              data.map((group, index) => (
                <Draggable key={`${group.id}`}draggableId={`${group.id}`} index={index}>
                  {(provided) => (
                    <div {...provided.draggableProps}  {...provided.dragHandleProps} ref={provided.innerRef} >
                      <div className="card text-white bg-primary mb-3" id={`${group.id}`}>
                        <div className="card-body">
                          <h5 className="card-title">
                            {group.name}
                          </h5>
                        </div>
                      </div>
                    </div> 
                  )}
                </Draggable>   
              ))
              }
            </div>
          )}
          </Droppable>
          <Droppable droppableId="characters3">
          {(provided) => (
            <div className="characterdelete" {...provided.droppableProps}  ref={provided.innerRef}>
              <img src="./images/cesto.jpg" className="w-10"></img>
            </div>
          )}
          </Droppable>
          <div className="charactercontinue">
            <Button onClick={this.getEmployees} className="btn btn-info">Continuar</Button>
          </div>
          <Droppable droppableId="characters2">
          {(provided) => (
            <div className="item characterList" {...provided.droppableProps}  ref={provided.innerRef} id="list">
              {
              employesByGroup.length === 0 ? (
                <div>Tap Here!</div>
                ) : ''}
              {employesByGroup.map((employees, index) => (
                  <Draggable key={`${employees.id} s`}draggableId={`${employees.id} ss`} index={index}>
                    {(provided) => (
                      <div {...provided.draggableProps}  {...provided.dragHandleProps} ref={provided.innerRef} >
                        <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input" 
                                   defaultChecked onChange={this.handleCheckbox} id={`${employees.id}`}/>
                            <label> {employees.name} </label>
                          </div>
                        </div>
                          </div>
                      </div> 
                    )}
                  </Draggable>   
              ))}
            </div>
          )}
          </Droppable>
          </div>
        </DragDropContext>
      </div>
    );
  }

}