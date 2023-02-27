import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotebookDetailsThunk } from "../../store/notebook";
import { useHistory, useParams } from "react-router-dom";
import "./NotebookDetails.css"
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

    // useEffect(()=>{
    //     dispatch(getNoteThunk(noteId))
    // },[dispatch,noteId])

    // console.log(myNotebook.notes)

    return (
        <div>
            <div>
                <h1>{singleNotebook.title} - {new Date(singleNotebook.created_at).toLocaleDateString()}</h1>
                <OpenModalButton
				className="delete-spot"
				modalComponent={<DeleteNotebookModal />}
				buttonText="Delete Notebook"
			/>
            </div>
            <div>
                <ul>
                {singleNotes?.map(note => (
                    <li key={note.id} onClick={() => history.push(`/notes/${note.id}`)}>{note.title}</li>
                ))}
                </ul>
            </div>
        </div>
    );
}

