import React, { useState, useEffect } from 'react';
import './App.css';
// eslint-disable-next-line
import { Form, TextField, SelectField, SubmitButton, LeafletMap } from './FormElements';
import * as Yup from 'yup';
import "yup-phone";
import "./App.css";
import 'leaflet/dist/leaflet.css';
import 'milligram/dist/milligram.css';

const formSchema = {
    name: {
        type: "text",
        label: "Name",
        required: true
    },
    phone: {
        // type: "phone",
        type: "text",
        label: "Phone",
        required: true
    },
    email: {
        type: "email",
        label: "Email",
        required: true
    },
    positon: {
        type: "map",
        options: {
            lat: -42.0,
            lon: 173.0,
            zoom: 5
        }
    },
    submit: {
        type: "submit",
        label: "Submit",
    }
}

function App() {
    const [formData, setFormData] = useState({});
    const [validationSchema, setValidationSchema] = useState({});

    useEffect(() => {   
        initForm(formSchema);
    }, []);

    const initForm = (formSchema) => {
        let _formData = {};
        let _validationSchema = {};

        for(var key of Object.keys(formSchema)){
            _formData[key] = "";

            if(formSchema[key].type === "text"){
                _validationSchema[key] = Yup.string();
            }else if(formSchema[key].type === "email"){
                _validationSchema[key] = Yup.string().email()
            // }else if(formSchema[key].type === "phone"){
            //     _validationSchema[key] = Yup.string().phone().required()
            }else if(formSchema[key].type === "select"){
                _validationSchema[key] = Yup.string().oneOf(formSchema[key].options.map(o => o.value));
            }

            if(formSchema[key].required){
                _validationSchema[key] = _validationSchema[key].required('Required');
            }
        }

        setFormData(_formData);
        setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    }

    const getFormElement = (elementName, elementSchema) => {
        const props = {
            name: elementName,
            label: elementSchema.label,
            options: elementSchema.options
        };

        if (elementSchema.type === "text" || elementSchema.type === "email") {
            return <TextField {...props} />
        }
        if (elementSchema.type === "select") {
            return <SelectField  {...props} />
        }
        if(elementSchema.type === "map") {
            return <LeafletMap {...props} />
        }
        if(elementSchema.type === "submit") {
            return <SubmitButton {...props} />
        }


    }

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        console.log(values);
        setSubmitting(false);

        fetch(process.env.REACT_APP_SUBMIT_URL, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div className="App">
            <Form
                enableReinitialize
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                action={process.env.REACT_APP_SUBMIT_URL}
            >
                {Object.keys(formSchema).map( (key, ind) => (
                    <div key={key}>
                        {getFormElement(key, formSchema[key])}
                    </div>
                ))}
            </Form>
        </div>
    );
}

export default App;