import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { Container, Form, FormGroup, Button, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Expenses extends Component { 

    emptyItem={
        expensedate: new Date(),
        discription: '',
        category: ''
    }

    constructor(props){
        super(props)
        this.state = { 
            date: new Date(),
            isLoading : true,
            expenses : [],
            categories : '',
            item: this.emptyItem,
            username : ''
         } 
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.handleDateChange = this.handleDateChange.bind(this);
         this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    state = { 
        date: new Date(),
        isLoading : true,
        expenses : [],
        categories : '',
        item: this.emptyItem,
        username: ''
     }

     async handleSubmit(event){
         
         const item = this.state.item;
         console.log(this.state.username)

        var data = await fetch(`api/expenses/expense/users/${this.state.username}`,{
             method : 'POST',
             headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json' 
             },
             body : JSON.stringify(item)
         })
         console.log(data)
     }

     handleChangeCategory(event){
         console.log(this.state.categories[event.target.value-1].name)

         let item = {...this.state.item}
         item['category'] = this.state.categories[event.target.value-1].name 
         this.setState({
             item
         })
      }

     handleChange(event){
         const target = event.target; //target is the data that i am entering
         const value = target.value; //
         const name = target.name; //name is title. if it wasn't defined it will return null.

         let item = {...this.state.item};
         item[name]=value;
         this.setState({item});
         console.log(this.state.item);
     }

     handleDateChange(date){
         let item = {...this.state.item};
         item.expensedate = date;
         this.setState({item});
     }

    //  async remove(id){
    //      await fetch(`/api/expenses/${id}`, { 
    //         method :'DELETE',   
    //         headers : {
    //             'Accept' : 'application/json',
    //             'Content-Type' : 'application/json'
    //         }
    //      }).then(() => {
    //          let updatedExpenses = [...this.state.expenses].filter(i=> i.id !== id); //expenses is an object that contains a bunch of elements, i.e an array, so ... is how we pass an array. here we itirate throgh all the components in expenses and look for id that is not equal to the one that we removed
    //          this.setState({expenses : updatedExpenses});
    //      });
    //  }

     async componentDidMount(){
         const response = await fetch('/api/categories');
         const body = await response.json();
         this.setState({categories : body, isLoading:false, username: localStorage.getItem("username")})
     }

    render() { 
        const title = <h3>Add Expense</h3>
        const {categories} = this.state;
        const {expenses, isLoading} = this.state;

        if(isLoading) 
            return(<div>Loading...</div>)

        let optionList = 
            categories.map(category =>
                <option value={category.id} key={category.id}>
                    {category.name}
                </option>
            )

        let rows =
            expenses.map(expense=>
                <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.location}</td>
                    <td><Moment date={expense.expensedate} format = "DD/MM/YYYY"/></td>
                    <td>{expense.category.name}</td>
                    <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete </Button></td>
                </tr>    
            )

        return ( 
            <div>
                <AppNav/>
                <Container>
                    {title}

                    <Form>

                        <FormGroup>
                            <Label for="category">Category</Label>
                            <select onChange={this.handleChangeCategory}>
                                {optionList}
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">Description</Label>
                            <input type="text" name="description" id="description" 
                                onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="expenditure">Expenditure</Label>
                            <input type="text" name="expenditure" id="expenditure" 
                                onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="date">Date</Label>
                            <DatePicker selected={this.state.item.expensedate}
                                onChange={this.handleDateChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary" type="submit"  onClick={()=>{this.handleSubmit()}}>Save</Button>{' '}
                            <Button color="secondary" tag={Link} to='/'>Cancel</Button>
                        </FormGroup>

                    </Form>
                </Container>

            </div>
         );
    }
}
 
export default Expenses;