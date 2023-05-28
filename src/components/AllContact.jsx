import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InfiniteScroll from 'react-infinite-scroll-component';
function AllContact() {
    const [show, setShow] = useState(true);
    const [loading, setLoading] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [detailModal, setDetailModal] = useState(false)

    const fetchMoreData = async () => {
        console.log('Fetch Data.......')
        setLoading(true)
        try {
            const { data } = await axios.get(`https://openlibrary.org/search.json?q=the+lord+of+the+rings&page=${page}`)
            setLoading(false)
            setData(data?.docs)
            console.log('---data', data)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMoreData()
    }, [])

    console.log(data)
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>All Contacts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row g-1 mb-2">
                        <div class="col-md-12"> <input placeholder="Search..." class="form-control" /> </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-centern' style={{ gap: '8px', marginBottom: '1rem' }}>
                        <Button>All Contact</Button>
                        <Button>Us Contact</Button>
                    </div>

                    {loading ? <p>Loading....</p> : <div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
                        <InfiniteScroll
                            dataLength={data.length}
                            next={fetchMoreData}
                            hasMore={true}
                            // loader={<h4>Loading...</h4>}
                            scrollableTarget="scrollableDiv"
                        >
                            {
                                data.map((d) => (
                                    <p onClick={() => setDetailModal(true)}>{d?.title}</p>
                                ))
                            }
                        </InfiniteScroll>
                    </div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={detailModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setDetailModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AllContact