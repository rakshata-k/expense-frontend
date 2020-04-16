import React, { Component } from 'react';
import AppNav from './AppNav';
import './App.css';
import { Container, Table, NavItem, Button} from 'reactstrap';

class Category extends Component {
    state = { 
        isLoading : true, //this part tells react that once you load the object or component first, i have  no categories in it and my page is still loading because i haven't fetched any data from any sources.
        username : localStorage.getItem('username'),
        users : []
     }
     
     //state is the internal storage of any component
    async componentDidMount(){
         const response = await fetch(`api/users/${this.state.username}`);
         //console.log(response)
         const body = await response.json();
         console.log(body)
         this.setState({users : body, isLoading : false});
     }

     async remove(description){
        await fetch(`/api/expenses/${description}/users/${this.state.username}`, { 
           method :'DELETE',   
           headers : {
               'Accept' : 'application/json',
               'Content-Type' : 'application/json'
           }
        }).then(async () => {
            const response = await fetch(`api/users/${this.state.username}`);
         //console.log(response)
         const body = await response.json();
         console.log(body)
         this.setState({users : body, isLoading : false});
        });
    }
     //every cmponent in the index.js file will have it's own state. we are not supposed to update the content of the state directly.

     //the goal here is to call the spring boot application running on port 8080
     //2 ways of calling a function in js: sync and async
     //snyc- you send a request and wait for response
     //async -  you send a request and you don't have to wait,you can continue doing your work and when the response is ready react will be notified and the UI will be updated accordingly

     //react by default has an async componentDidMount() mtd. After everything is mounted, this async mtd is called to a spring boot end point

    

     //the spring app is running on port 8080 and the react js on 3000, so we use proxy to connect the two



    render() { 

        let rows = <tr><td></td><td></td><td>No Expenses</td></tr>

        if(this.state.users.expense != null && this.state.users.expense.length > 0){
            rows =
            this.state.users.expense.map((expense,id) =>
                <tr key={id}>
                    <td>{expense.expensedate}</td>
                    <td>{expense.category}</td>
                    <td>{expense.description}</td>
                    <td>{expense.expenditure}</td>
                    <td><Button color="danger" onClick={()=>{this.remove(expense.description)}}>Delete</Button></td>
                </tr>
        )
        }
       

        const{isLoading} = this.state;

        if(isLoading) 
            return (<div><center>Loading...</center></div>)

        return (
            <div>
                <AppNav/>
                <Container>

                    <h3> Your Expenses </h3>

                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Date</th>
                               <th width="20%"> Category </th>
                               <th width="25%"> Description </th>
                               <th width="20%"> Expenditure </th>
                               <th >Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows}
                        </tbody>

                    </Table>

                </Container>
            </div>

          );
    }
    //render is the part which processes the jsx file and return them as an export
}
 
export default Category;