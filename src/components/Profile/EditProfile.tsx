import { Button, Input, Modal, Switch } from "antd";
import { useState } from "react";
import { LiaUserEditSolid } from "react-icons/lia";

const EditProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  return (
    <>
      <Button size="small" shape="circle" onClick={() => setOpenModal(true)}>
        <LiaUserEditSolid />
      </Button>
      <Modal
        title="Edit Profile"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={
          <div className="flex justify-end gap-1">
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button
              //   disabled={isLoading}
              type="primary"
              color="primary"
              //   onClick={handleSubmit}
            >
              Update
            </Button>
          </div>
        }
      >
        <span className="text-sm">{isPublic ? 'Public' : 'Private'} <Switch size="small" title="Account Privacy" onChange={() => setIsPublic(prev => !prev)} defaultChecked/></span>
        <label htmlFor="username">Username</label>
        <Input id="username" />
        <label htmlFor="firstname">Firstname</label>
        <Input id="username" />
        <label htmlFor="lastname">Lastname</label>
        <Input id="username" />
        <label htmlFor="lastname">Bio</label>
        <Input id="bio" />
      </Modal>
    </>
  );
};

export default EditProfile;
