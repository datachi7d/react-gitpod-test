import React from 'react';
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,
// eslint-disable-next-line
    useField,
// eslint-disable-next-line
    useFormik
} from 'formik';

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from 'react-leaflet';

export function Form(props) {
    return (
        <Formik
            {...props}
        >
            <FormikForm className="needs-validation" novalidate="">
                {props.children}
            </FormikForm>
        </Formik>)
}

export function TextField(props) {
    const { name, label, placeholder, ...rest } = props
    return (
        <>
            {label && <label for={name}>{label}</label>}
            <Field
                className="form-control"
                type="text"
                name={name}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}

export function SelectField(props) {
    const { name, label, options } = props
    return (
        <>
            {label && <label for={name}>{label}</label>}
            <Field
                as="select"
                id={name}
                name={name}
            >
                <option value="" >Choose...</option>
                {options.map((optn, index) => <option value={optn.value} label={optn.label || optn.value} />)}
            </Field>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}

export function SubmitButton(props){
    const { label, ...rest } = props;
    const { isSubmitting } = useFormikContext();
    
    return (
        <button type="submit" {...rest} disabled={isSubmitting} >{label}</button>
    )
}

export function LeafletMap(props){
    const { lat, lon, zoom } = props.options
    return (
        <MapContainer center={[lat, lon]} zoom={zoom}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        </MapContainer>
    )
}