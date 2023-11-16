import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AssignmentCards, AssignmentCardsProps } from "./AssignmentCards"
import { CreateAssignmentModal } from "./CreateAssignmentModal"
import useAxiosPrivate from "../../hooks/axiosPrivate"

const AssignmentDetails = () => {
  const axiosInstance = useAxiosPrivate()

  const useFetchAssignments = () => {
    const [assignments, setAssignments] = useState([])
    const { scholarshipid } = useParams()

    const fetchAssignments = async () => {
      try {
        const URL =
          process.env.REACT_APP_API_URL + "/api/assignment/" + scholarshipid
        const response = await axiosInstance.get(URL)
        setAssignments(response.data.data)
      } catch (error) {
        console.error("Error fetching assignments:", error)
        setAssignments([])
      }
    }

    return { assignments, fetchAssignments }
  }
  const { assignments, fetchAssignments } = useFetchAssignments()
  const [shouldFetchAssignments, setShouldFetchAssignments] = useState(true)

  useEffect(() => {
    if (shouldFetchAssignments) {
      fetchAssignments()
      setShouldFetchAssignments(false)
    }
  }, [fetchAssignments, shouldFetchAssignments])

  return (
    <Flex
      textAlign={"center"}
      justifyContent={"center"}
      pt={10}
      direction={"column"}
      width={"full"}
      overflow={"hidden"}
    >
      <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"}>
        <Heading
          size="sm"
          as="h1"
          mb="6"
          fontSize={{ base: 30, md: 36, lg: 48 }}
        >
          List of Assignments
        </Heading>
      </Box>
      <SimpleGrid columns={1} spacing={"5"} mb={10} mx={"auto"}>
        <CreateAssignmentModal
          afterCreate={() => setShouldFetchAssignments(true)}
        />
        {assignments.length > 0 ? (
          assignments.map((assignment: AssignmentCardsProps, index: any) => (
            <AssignmentCards
              key={index}
              index={index}
              assignment_id={assignment.assignment_id}
              scholarship_id={assignment.scholarship_id}
              assignment_name={assignment.assignment_name}
              assignment_description={assignment.assignment_description}
              onDeleteSuccess={() => {
                setShouldFetchAssignments(true)
              }}
              onEditSuccess={() => {
                setShouldFetchAssignments(true)
              }}
            />
          ))
        ) : (
          <Text>No Assignments 😍</Text>
        )}
      </SimpleGrid>
    </Flex>
  )
}

export default AssignmentDetails
