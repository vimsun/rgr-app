import React, { Component, useState, useEffect, useLayoutEffect} from 'react';
import { Button, Row, Col, ControlLabel, Form, FormGroup, Modal, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';

export default function AddSongModal() {

    const [show, setShow] = useState(false);
    const [song_name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');
    const [song_year, setYear] = useState('');
    const [album_name, setAlbum] = useState('');
    const [language_name, setLanguage] = useState('');


    let handleSubmit = (event) => {

        event.preventDefault();

        var query = 'http://localhost:3004/song/';
    
        axios.post((query), {
            song_name: song_name,
            artist: artist,
            genre: genre,
            song_year: song_year,
            album_name: album_name,
            language_name: language_name
        })
        .then(response => {
            console.log(response);
            if(response.data.success === "success") {
              window.location.reload();
            }
        })
        .catch(error => console.log(error));
    
    }

    let handleClose = () => {
      setShow(false);
    }
  
      return (
        <div>
          <Button  variant="outline-info" onClick={(e) => setShow(!show)}>
            Add new song
          </Button>
  
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add new song</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form className={'modal_form'}>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    Name
                </Form.Label>
                <Col>
                    <Form.Control className={"select service modal_form"}  as="textarea" rows="1" required onChange={(e) => setName(e.target.value)}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Artist
                </Form.Label>
                <Col>
                    <Form.Control className={"select service modal_form"}  as="textarea" rows="1" required onChange={(e) => setArtist(e.target.value)}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    Genre
                </Form.Label>
                <Col>
                    <Form.Control className={"select service modal_form"}  as="textarea" rows="1" required onChange={(e) => setGenre(e.target.value)}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    Year
                </Form.Label>
                <Col>
                    <Form.Control className={"select service modal_form"}  as="textarea" rows="1" required onChange={(e) => setYear(e.target.value)}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    Album
                </Form.Label>
                <Col>
                    <Form.Control className={"select service modal_form"}  as="textarea" rows="1" required onChange={(e) => setAlbum(e.target.value)}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    Language
                </Form.Label>
                <Col>
                    <Form.Control className={"select service modal_form"}  as="textarea" rows="1" required onChange={(e) => setLanguage(e.target.value)}/>
                </Col>
            </Form.Group>

        </Form>     
            </Modal.Body>
            <Modal.Footer>
              <Button  variant="outline-info" onClick={handleSubmit}>
                Save
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
  }
  
