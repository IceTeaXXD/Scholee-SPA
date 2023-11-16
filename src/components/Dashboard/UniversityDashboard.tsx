import { InfoIcon } from "@chakra-ui/icons"
import {
  Heading,
  Grid,
  Center,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  Button
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/axiosPrivate"
import { handleGetInfo } from "../../utils/auth"

export const UniversityDashboard = () => {
  const axiosInstance = useAxiosPrivate()
  const [userInfo, setUserInfo] = useState({
    user_id: 0,
    name: "",
    email: "",
    role: ""
  });

  const [studentCount, setStudentCount] = useState()

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await handleGetInfo();
        setUserInfo({
          user_id: response?.data.user_id,
          name: response?.data.name,
          email: response?.data.email,
          role: response?.data.roles
        });

        const students = await axiosInstance.get(
          process.env.REACT_APP_API_URL + "/api/university/stats/" + response?.data.user_id
        );

        setStudentCount(students.data.data.data[0].applicant_count)
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    getInfo();
  }, []);

  return (
    <>
      <Heading as="h2" size={"lg"}>
        Dashboard
      </Heading>

      <Grid templateRows={"repeat(1,1fr)"} templateColumns="repeat(1, 1fr)">
        <Center>
          <GridItem w={["80%", "50%"]}>
            <Card>
              <CardHeader>
                <InfoIcon w="8" h="8" />
                <Heading size={"lg"}>{studentCount}</Heading> Students
              </CardHeader>
              <CardBody>
                <Link to={`/report`}>
                  <Button colorScheme="blue" size={["sm", "lg"]}>
                    View Here
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </GridItem>
        </Center>
      </Grid>
    </>
  )
}
