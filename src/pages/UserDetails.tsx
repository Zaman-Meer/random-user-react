import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import { UserFetchDataType } from "../types";
import { fetchUserData } from "../services";
import { toast } from "react-toastify";
import Button from "../components/Button";

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
    margin: 0 auto;
  }
  h5 {
    font-size: 16px;
    font-family: 600;
  }
  .header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
  }
  .sectors-container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 45px;

    .wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      .sector {
        font-size: 16px;
        color: #253858;
      }
    }
  }
`;

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserFetchDataType>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchUserData = async () => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetchUserData(id);
      setUserData(response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    if (id) handleFetchUserData();
    else navigate("/form/add");
  }, []);

  if (loading)
    return (
      <Container>
        <ContainerInner>
          <h3>Fetching...</h3>
        </ContainerInner>
      </Container>
    );

  return (
    <Container>
      <ContainerInner>
        <h3>User Details</h3>
        <div className="header">
          <h5>User Name:</h5> <p>{userData?.name}</p>
        </div>
        <div className="sectors-container">
          <h5>Sectors:</h5>
          <div className="wrapper">
            {userData?.sectors?.map((sector, index) => (
              <p key={index}>
                {`${sector}${
                  index === userData?.sectors?.length - 1 ? "" : ","
                }`}
              </p>
            ))}
          </div>
        </div>
        <Button onClick={() => navigate(`/form/edit/${id}`)}>Edit</Button>
      </ContainerInner>
    </Container>
  );
};

export default UserDetails;
