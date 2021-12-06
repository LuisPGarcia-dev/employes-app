import React from 'react'
import PaginationComponent from '../pagination/pagination.component';

import './table.styles.sass';

import moment from 'moment'

export default class TableComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        currentPage: 1,
        employeesPerPage: 10,
        employees: []
    }


    render() {

        // Paginacion
        const { currentPage, employeesPerPage, employees} = this.state


        const indexOfLastEmploye = currentPage * employeesPerPage;
        const indexOfFirstEmploye = indexOfLastEmploye - employeesPerPage;

        const currentEmployees = this.props.employees.slice(indexOfFirstEmploye,indexOfLastEmploye);

        const paginate = pageNum => this.setState({currentPage: pageNum})

        const nextPage = () => this.setState({currentPage: currentPage + 1})
        const prevPage = () => this.setState({currentPage: currentPage - 1})

        // Filtrado de input

        const filterData = (e) => {
            if(e.target.value !== '') {
                const finded = this.props.employees.filter(object => Object.keys(object).some(key => 
                    String(object[key]).toLowerCase().includes(e.target.value.toLowerCase())))
                if(finded.length === 0) {
                    alert("Sin coincidencias")
                    e.target.value = '';
                }
                this.setState({employees: finded})
            } else {
                console.log("Vacio", currentEmployees, employees)
                this.setState({currentEmployees, employees: []})
            }
        }

        // checar el paginado mal cuando regresa el state, cambiar datos de fecha a tipo moment

        return (
            <div className="w-100">
                <div className="table-responsive">
                    <div className="d-flex justify-content-center mt-3">
                        <input className="" type="text" onChange={filterData} placeholder="Buscar"/>
                    </div>
                    <table className="table table-hover table-borderless mt-3 mb-5">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">Año de Nacimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            employees.length > 0 ? employees.map(employe => (
                                <tr>
                                    <th scope="row">{employe.id}</th>
                                    <td>{employe.name}</td>
                                    <td>{employe.last_name}</td>
                                    <td>{moment(employe.birthday).format("DD/MM/YYYY")}</td>
                                </tr>
                            ))
                            : 
                            currentEmployees.map(employe => (
                                <tr>
                                    <th scope="row">{employe.id}</th>
                                    <td>{employe.name}</td>
                                    <td>{employe.last_name}</td>
                                    <td>{moment(employe.birthday).format("DD/MM/YYYY")}</td>
                                </tr>
                                ))
                            }

                        </tbody>
                    </table>
                    <PaginationComponent totalEmployees={this.props.employees.length} paginate={paginate} 
                    prevPage={prevPage} nextPage={nextPage} currentPage={currentPage}/>
                </div>
            </div>
        );
    }
}