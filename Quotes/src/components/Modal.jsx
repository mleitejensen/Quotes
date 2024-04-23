const Modal = ({setCheckDelete, deletePost, _id }) => {

    const closeModal = () => { 
        setCheckDelete(false)
    }


    return(
        <>
        <div className="blur" onClick={closeModal}></div>
        <div className="deleteBox" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to delete this quote?</h3>
            <div className="question">
                <button onClick={() => {deletePost(_id); closeModal()}}>Yes, delete my post</button>
                <button onClick={closeModal}>No, dont delete my post</button>
            </div>
        </div>
        
        
        </>
    )
}

export default Modal