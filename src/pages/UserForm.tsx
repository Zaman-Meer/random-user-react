import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import InputLabel from "../components/InputLabel";
import Input from "../components/Input";
import SectorSelect from "../components/SectorSelect";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import { SubsectorType } from "../types";
import {
  createUser,
  fetchAllSectors,
  fetchUserData,
  updateUserData,
} from "../services";
import { useNavigate, useParams } from "react-router-dom";
import { UserSendDataType } from "../types";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const ContainerInner = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  color: #253858;
  font-size: 16px;
  padding: 24px;
  margin-top: 48px;
  h3 {
    font-size: 24px;
  }
`;

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserSendDataType>({
    name: "",
    sectors: [],
    agree_to_terms: false,
  });
  const [sectorsData, setSectorData] = useState<SubsectorType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    name: "",
    sectors: "",
    agree_to_terms: "",
  });

  const handleFetchSectors = async () => {
    setLoading(true);
    try {
      const response = await fetchAllSectors();
      setSectorData(response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch sectors.");
    }
  };

  const handleFetchUserData = async () => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetchUserData(id);
      setUserData({
        name: response?.data?.name,
        sectors: response?.data?.sectors,
        agree_to_terms: response?.data?.agree_to_terms,
      });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    handleFetchSectors();
    if (id) handleFetchUserData();
  }, []);

  const handleChangeInputs = (
    value: string | string[] | boolean,
    type: "name" | "sectors" | "agree_to_terms"
  ) => {
    setErrors((prevState) => ({
      ...prevState,
      [type]: "",
    }));

    setUserData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      userData?.name &&
      userData?.sectors?.length > 0 &&
      userData?.agree_to_terms
    ) {
      setLoading(true);
      if (id) {
        try {
          await updateUserData(userData, id);
          setLoading(false);
          toast.success("User updated successfully.");
          navigate(`/user/${id}`);
        } catch (error) {
          setLoading(false);
          toast.error("Failed to update user.");
        }
      } else {
        try {
          const response = await createUser(userData);
          setLoading(false);
          toast.success("User created successfully.");
          navigate(`/user/${response?.data?.id}`);
        } catch (error) {
          setLoading(false);
          toast.error("Failed to create user.");
        }
      }
    } else {
      if (userData?.sectors?.length === 0) {
        setErrors((prevState) => ({
          ...prevState,
          sectors: "Select at least one sector.",
        }));
      }
    }
    if (!userData?.name) {
      setErrors((prevState) => ({
        ...prevState,
        name: "User name cannot be empty.",
      }));
    }
    if (!userData?.agree_to_terms) {
      setErrors((prevState) => ({
        ...prevState,
        agree_to_terms: "Accept terms",
      }));
    }
  };

  return (
    <Container>
      <ContainerInner>
        <h3>User Form</h3>
        <InputLabel>
          Please enter your name and pick the Sectors you are currently involved
          in.
        </InputLabel>
        <Input
          fullWidth
          label="Name"
          value={userData?.name}
          onChange={(event) => handleChangeInputs(event.target.value, "name")}
          disabled={loading}
          isInvalid={!!errors?.name}
          helperText={errors?.name || ""}
        />
        <SectorSelect
          fullWidth
          placeholder="Select Sectors"
          data={sectorsData}
          name="sectors-select"
          label="Sectors"
          selectedOptions={userData?.sectors}
          onChange={(sectors) => handleChangeInputs(sectors, "sectors")}
          disabled={loading}
          error={!!errors?.sectors}
          helperText={errors?.sectors || ""}
        />
        <Checkbox
          label="Agree to terms"
          checked={userData?.agree_to_terms}
          onChange={() =>
            handleChangeInputs(!userData?.agree_to_terms, "agree_to_terms")
          }
          disabled={loading}
          hasError={!!errors?.agree_to_terms}
          helperText={errors?.agree_to_terms || ""}
        />
        <Button onClick={handleSubmit} disabled={loading} loading={loading}>
          {id ? "Update" : "Save"}
        </Button>
      </ContainerInner>
    </Container>
  );
};

export default UserForm;
