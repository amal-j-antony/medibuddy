import React, { useEffect, useState } from 'react'
import { deleteRecordAPI, editRecordAPI, getRecordsAPI } from '../services/allAPI'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Bounce, toast } from 'react-toastify';
import Swal from 'sweetalert2';



function DisplayRecord({ getRecords, allRecords, record, setRecord }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = async (rec) => {
        setRecord(rec)
        handleShow()
    }

    const confirmEdit = async () => {
        const bmiCalc = (record.weight / (record.height ** 2) * 100).toFixed(2)
        const result = await editRecordAPI({
            ...record, bmi: bmiCalc
        }, record.id)
        console.log(result);
        if (result.status == 200) {
            getRecords()
            handleClose()
            toast(' Record edited successfully', {
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
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong",
            });
        }

    }

    const deleteHelper = async (recordId) => {
        const result = await deleteRecordAPI(recordId)
        if (result?.status == 200) {
            Swal.fire({
                title: "Deleted!",
                text: "Record has been deleted.",
                icon: "success"
            });
        }
        getRecords()
    }

    const deleteRecord = async (recordId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const result = deleteHelper(recordId)

            }
        });
    }

    return (
        <>
            <div className="row d-flex justify-content-center">
                {
                    allRecords.map((item, index) => (
                        <div key={item.id} className="col-12 col-lg-3 shadow m-3 p-3 border border-primary rounded-3 d-flex flex-column align-items-center">
                            <div className='d-flex align-items-center'>
                                <h1>{item.name}, </h1>
                                <h1> {item.age}</h1>
                            </div>
                            <span className=' d-flex w-50 justify-content-between'>Height: <span>{item.height}cm</span></span>
                            <span className=' d-flex w-50 justify-content-between'>Weight: <span>{item.weight}kg</span></span>
                            <span className=' d-flex w-50 justify-content-between'>BMI: <span>{item.bmi}</span></span>
                            <div className="d-flex w-50 gap-2 justify-content-between">
                                <Button onClick={() => handleEdit(item)} className=" btn btn-warning"><FaEdit /></Button>
                                <Button onClick={() => deleteRecord(item.id)} className=" btn btn-danger"><MdDeleteForever /></Button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Record</Modal.Title>
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
                    <Button variant="primary" onClick={confirmEdit}>
                        Edit record
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default DisplayRecord