import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotebookDetailsThunk } from "../../store/notebook";
import { useHistory, useParams } from "react-router-dom";
import "./NotebookDetails.css";
import OpenModalButton from "../OpenModalButton";
import DeleteNotebookModal from "./NotebookDelete";

export default function NotebookDetails(){
    const singleNotebook = useSelector(state => state.notebooks.singleNotebook)
    const singleNotes = useSelector(state => state.notebooks.singleNotebook.notes)
    const dispatch = useDispatch();
    const history = useHistory();
    const {notebookId} = useParams();


    useEffect(()=>{
        dispatch(getNotebookDetailsThunk(notebookId))
    },[dispatch, notebookId])

    return (
        <div className="notebook-details-container">
            <div className="notebook-details-header">
                <h1 className="notebook-details-title">{singleNotebook.title} - {new Date(singleNotebook.created_at).toLocaleDateString()}</h1>
                <OpenModalButton
                    className="delete-notebook-button"
                    modalComponent={<DeleteNotebookModal />}
                    buttonText="Delete Notebook"
                />
            </div>
            <div className="notebook-details-notes-container">
                <div className="notebook-details-notes">
                    {singleNotes?.map(note => (
                        <div className="notebook-details-note" key={note.id} onClick={() => history.push(`/notes/${note.id}`)}>{note.title}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
