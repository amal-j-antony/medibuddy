import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DisplayRecord from './DisplayRecord';
import { addRecordAPI, getRecordsAPI } from '../services/allAPI';
import Swal from 'sweetalert2'
import { Bounce, toast } from 'react-toastify';


function Home() {
    const [show, setShow] = useState(false);
    const [record, setRecord] = useState({
        name: "",
        age: "",
        height: "",
        weight: "",
        bmi: ""
    })

    const [allRecords, setAllRecords] = useState([])

    const getRecords = async () => {
        const result = await getRecordsAPI()
        console.log(result);
        setAllRecords(result.data)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAdd = async () => {
        const { name, age, height, weight } = record
        if (name && age && height && weight) {
            const bmiCalc = ((weight / (height ** 2)) * 100).toFixed(2)


            const result = await addRecordAPI({
                ...record,
                bmi: bmiCalc
            })
            console.log(result);
            if (result.status == 201) {
                toast(' Record added successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                handleClose()
                setRecord({
                    name: "",
                    age: "",
                    height: "",
                    weight: "",
                    bmi: ""
                })
                getRecords()
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please ensure all forms are filled",
            });
        }


    }

    useEffect(() => {
        getRecords()
    }, [])

    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <section className='container'>
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <img src="/8507.jpg" className=' w-100' alt="" />
                        </div>
                        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center gap-5">
                            <h1 className='text-primary fw-bold'>Keep all your medical records in one place</h1>
                            <Button onClick={handleShow} className='btn btn-success w-50 py-2 fs-3'>Start Now</Button>
                        </div>
                    </div>
                    <DisplayRecord allRecords={allRecords} getRecords={getRecords} record={record} setRecord={setRecord} />
                </section>


                {/* modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex flex-column gap-4'>
                        <input onChange={(e) => setRecord({ ...record, name: e.target.value })} value={record.name} type="text" className="form-control" placeholder='Enter Full Name' />
                        <input onChange={(e) => setRecord({ ...record, age: e.target.value })} value={record.age} type="text" className="form-control" placeholder='Enter Age' />
                        <input onChange={(e) => setRecord({ ...record, height: e.target.value })} value={record.height} type="text" className="form-control" placeholder='Enter Height in cm' />
                        <input onChange={(e) => setRecord({ ...record, weight: e.target.value })} value={record.weight} type="text" className="form-control" placeholder='Enter Weight in kg' />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAdd}>
                            Add new record
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Home