import { CheckIcon, EmailIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Heading,
  Grid,
  Center,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  Button,
  Icon,
  Stack,
  Tooltip,
  Box,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import { useEffect, useState } from "react";
import { handleGetInfo } from "../../utils/auth";
import { FiEdit } from "react-icons/fi";
import { DataTable } from "../Scholarships/DataTable";
import { createColumnHelper } from "@tanstack/react-table";

export const OrganizationDashboard = () => {
  type Scholarship = {
    id: Number
    title: String
    description: String
    scholarshiptype: String
    coverage: Number
    action: JSX.Element
  }
  const columnHelper = createColumnHelper<(typeof scholarships)[0]>()
  const columns = [
    columnHelper.accessor("title", {
      cell: (info: any) => info.getValue(),
      header: "Title"
    }),
    columnHelper.accessor("description", {
      cell: (info: any) => info.getValue(),
      header: "Description"
    }),
    columnHelper.accessor("scholarshiptype", {
      cell: (info: any) => info.getValue(),
      header: "Type"
    }),
    columnHelper.accessor("coverage", {
      cell: (info: any) => info.getValue(),
      header: "Coverage",
      meta: {
        isNumeric: true
      }
    }),
  ]
  const axiosInstance = useAxiosPrivate();
  const [scholarshipLength, setScholarshipLength] = useState(0);
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [userId, setUserId] = useState(0);

  const fetchCountSch = async (userId: any) => {
    try {
      const api_url = new URL(
        process.env.REACT_APP_API_URL + `/api/scholarship/${userId}/count`
      );
      const response = await axiosInstance.get(api_url.toString());
      setScholarshipLength(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await handleGetInfo();
      const fetchedUserId = userInfo?.data.user_id;
      setUserId(fetchedUserId);

      await fetchCountSch(fetchedUserId);
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchScholarships()
  }, [userId]);
  const fetchScholarships = async () => {
    try {
      const api_url = new URL(
        process.env.REACT_APP_API_URL + "/api/scholarship"
      )
      const params = new URLSearchParams()
      params.append("itemsPerPage", "5")
      api_url.search = params.toString()
      const response = await axiosInstance.get(api_url.toString())

      if (!response) {
        throw new Error("Error fetching scholarships.")
      }

      const jsonData = await response.data
      const data = jsonData.data
      const scholarships_data = data.map((scholarship: any) => ({
        title: scholarship.title,
        description: scholarship.short_description,
        scholarshiptype: scholarship.type
          .map((type: any) => type.type)
          .join(", "),
        coverage: `$${scholarship.coverage}`,
        action: (
          <Stack direction="row" spacing={2}>
            <Tooltip label="See students who applied">
              <Link
                to={`/scholarships/${scholarship.scholarship_id}/acceptance`}
              >
                <Button
                  variant="ghost"
                  colorScheme="green"
                  size="sm"
                  leftIcon={<Icon as={CheckIcon} />}
                >
                  Acceptance
                </Button>
              </Link>
            </Tooltip>
            <Tooltip label="See assignments details">
              <Link
                to={`/scholarships/${scholarship.scholarship_id}/assignments`}
              >
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  size="sm"
                  leftIcon={<Icon as={FiEdit} />}
                >
                  Assignments
                </Button>
              </Link>
            </Tooltip>
            <Tooltip label={`${scholarship.count} views`}>
              <Button
                variant="ghost"
                colorScheme="grey"
                size="sm"
                leftIcon={<Icon as={ViewIcon} />}
              >
                {`${scholarship.count} views`}
              </Button>
            </Tooltip>
          </Stack>
        )
      }))
      setScholarships(scholarships_data)
    } catch (err: any) {
      return console.error(err.message)
    }
  }
  return (
    <>
      <Heading as="h2" size="lg" mb="4">
        Dashboard
      </Heading>

      <Card boxShadow="md">
        <CardHeader bg="gray.700" color="white">
          <EmailIcon w="8" h="8" />
          <Heading size="lg" ml="2">
            {scholarshipLength}
          </Heading>{" "}
          Scholarships
        </CardHeader>
        <CardBody>
          {scholarshipLength > 0 ? (
            <Link to="/scholarships">
              <Button colorScheme="gray" size={["sm", "lg"]}>
                View Here
              </Button>
            </Link>
          ) : (
            <Text>No scholarships available</Text>
          )}
        </CardBody>
      </Card>

      <Box mt="6">
        <Heading as="h3" size="md" mb="4">
          Scholarship Overview
        </Heading>
        <Box bg="white" mb="4" borderRadius="md">
          <DataTable data={scholarships} columns={columns} />
        </Box>
      </Box>
    </>
  );
};