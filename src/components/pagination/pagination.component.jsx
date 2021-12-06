

import React, { useState, useEffect, Component} from 'react';


export default class PaginationComponent extends React.Component {

    
    render() {

        const { totalEmployees, prevPage, nextPage, paginate, currentPage} = this.props


        const pageNumbers = [];

        for(let i = 1; i <= Math.ceil(totalEmployees / 10); i++) {
            pageNumbers.push(i);
        }
    
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className={`${currentPage === 1 ? 'disabled' : ''} page-item`}>
                        <a className="page-link" href="#"  aria-disabled="true" onClick={() => prevPage()}>Anterior</a>
                    </li>
                    {
                        pageNumbers.map(number => (
                            <li className="page-item" key={number}>
                                <a onClick={() => paginate(number)} className="page-link" href="#">{number}</a>
                            </li>
                        ))
                    }
                    <li className={`${currentPage === pageNumbers.length ? 'disabled' : ''} page-item`}>
                        <a className="page-link" href="#" onClick={() => nextPage()}>Siguiente</a>
                    </li>
                </ul>
            </nav>
        )
    }
}