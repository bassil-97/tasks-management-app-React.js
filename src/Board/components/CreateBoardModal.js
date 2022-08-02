import React from "react";
import Input from "../../shared/components/UIElements/Input";
import { useForm } from "../../shared/hooks/form-hook";

export default function CreateBoardModal({ createBoard }) {
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <div
      className="modal fade modal-lg"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              New Board
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <Input
                element="input"
                id="title"
                type="text"
                label="Title"
                errorText="Please enter a valid name."
                noBorder
                onInput={inputHandler}
                validators={[]}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => createBoard(formState.inputs.title.value)}
            >
              create board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
