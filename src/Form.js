import React from "react";
import './Main.css'
import Button from 'react-bootstrap/Button'
import { Field, FieldArray,reduxForm } from "redux-form";
import normalizePhone from './NormalisePhone'
import { useSelector } from "react-redux";
import { useState } from "react";
import ShowResults from "./showResults";

const upper = value => value && value.toUpperCase()
const lower = value => value && value.toLowerCase()
// const lessThan = otherField => (value, previousValue, allValues) =>
//   parseFloat(value) < parseFloat(allValues[otherField]) ? value : previousValue
// const greaterThan = otherField => (value, previousValue, allValues) =>
//   parseFloat(value) > parseFloat(allValues[otherField]) ? value : previousValue
  const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <input className="Field" {...input} placeholder={label} type={type} />
        {touched &&
          ((error && <span className="error"><br/>{error}</span>) ||
            (warning && <span className="error"><br/>{warning}</span>))}
      </div>
    </div>
  )
 

  const validate = values => {
    const errors = {}
    if (!values.username) {
      errors.username = '*Required'
    } else if (values.username.length > 15) {
      errors.username = '*Must be 15 characters or less'
    }
    if (!values.Employee_Code) {
      errors.Employee_Code = '*Required'
    }
    if (!values.phone) {
      if (!/^[0-9]{10}$/.test(values.phone)) {
       

        errors.phone = "*Please enter valid mobile no.";
      }
    }

    if (!values.email) {
      errors.email = '*Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = '*Invalid email address'
    }
    if (!values.age) {
      errors.age = '*Required'
    }
    else if (values.age < 19) {
      errors.age = '*Hmm, you seem a bit young...'
    } 
    else if (isNaN(Number(values.age))) {
      errors.age = '*Must be a number'
    } else if (Number(values.age) < 18) {
      errors.age = '*Sorry, you must be at least 18 years old'
    }
    if (!values.Address) {
      errors.Address = '*Required'
     
    } 
    return errors

  }
  

  const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
      <li>
        <Button  variant="primary" type="button" onClick={() => fields.push({})}>
        ADD SUBJECTS

        </Button>
        {submitFailed && error && <span>{error}</span>}
      </li>
      {fields.map((member, index) => (
        <li key={index}>
          <button
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}
          >Remove</button>
          <p>Subject #{index + 1}</p>
          <Field
            name={`${member}.Subject`}
            type="text"
            component={renderField}
            label="Subject"
          />
        
          
        </li>
      ))}
    </ul>
  )
  
 
  
const Form = (props) => {
  const form = useSelector(state => state.form)
  const [value, setvalue] = useState(true)
  const FinalValue=()=>{
    setvalue(false)
  }
  
  const {handleSubmit,reset,pristine, submitting}=props
  return (
    <div className="Form">
      <h1>RegistrationForm</h1>
      {value?<form onSubmit={handleSubmit(FinalValue)}>
      <div className='Cont'>
        <label>Employee Code</label>
        <div>
          <Field
            name="Employee_Code"
            component={renderField}
            type="text"
            placeholder="Employee Code"
            normalize={upper}
          />
        </div>
      </div>
      <div>
      <div>
      
  
        <div>
          <Field
            name="username"
            component={renderField}
            type="text"
            placeholder="Full Name"
            normalize={lower}
            label='username'
          />
        </div>
      </div>
      <div>
        <label>Phone</label>
        <div>
          <Field
            name="phone"
            component={renderField}
            type="text"
            placeholder="Phone Number"
            normalize={normalizePhone}
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component={renderField}
            type="email"
            placeholder="Email"
            
          />
        </div>
      </div>
      <div>
      <Field name="age" type="number" component={renderField} label="Age" />
      </div>
      <div>
      <Field
        name="Address"
        type="text"
        component={renderField}
        label="Address"
      />
       <FieldArray name="Subject" component={renderMembers}  />
      </div>
      <div>
      <label >Enjoy </label>
        <div>
          <Field
          
            name="Enjoy"
            id="Enjoy"
            component={renderField}
            type="checkbox"
          />
        </div>
      </div>
     
      <div className="Button">
        <Button type="submit" disabled={submitting}>
          Submit
        </Button>
       
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
      </div>
      </form>:<ShowResults data={form.MyForm.values}/>}
    </div>
  );
};

export default reduxForm({
  form: "MyForm", 
  initialValues: { min: '1', max: '10' },
  validate,
 
})(Form);
