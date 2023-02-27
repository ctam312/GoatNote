import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotebookDetailsThunk } from "../../store/notebook";
import { useParams } from "react-router-dom";
import "./NotebookDetails.css"

export default function NotebookDetails(){
    const singleNotebook = useSelector(state => state.notebooks.singleNotebook)
    const singleNotes = useSelector(state => state.notebooks.singleNotebook.notes)
    const dispatch = useDispatch();
    const {notebookId} = useParams();


    useEffect(()=>{
        dispatch(getNotebookDetailsThunk(notebookId))
    },[dispatch])

    // useEffect(()=>{
    //     dispatch(getNoteThunk(noteId))
    // },[dispatch,noteId])

    // console.log(myNotebook.notes)

    return (
        <div>
            <div>
                <h1>{singleNotebook.title} - {new Date(singleNotebook.created_at).toLocaleDateString()}</h1>
            </div>
            <div>
                <ul>
                {singleNotes?.map(note => (
                    <li key={note.id}>{note.title}</li>
                ))}
                </ul>
            </div>
        </div>
    );
}

