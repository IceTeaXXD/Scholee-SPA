import { EmailIcon } from "@chakra-ui/icons"
import {
  Center,
  Grid,
  Heading,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  Button,
  StatGroup,
  StatLabel
} from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <>
      <Heading as="h2" size={"lg"}>
        Dashboard
      </Heading>

      <Grid templateRows={"repeat(1,1fr)"} templateColumns="repeat(2, 1fr)">
        <Center>
          <GridItem w={["80%", "50%"]}>
            <Card>
              <CardHeader>
                <EmailIcon w="8" h="8" />
                <Heading size={"lg"}>10</Heading> Scholarships
              </CardHeader>
              <CardBody>
                <Link
                to = {`/scholarships`}
                >
                  <Button colorScheme="blue" size={["sm", "lg"]}>
                    View Here
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </GridItem>
        </Center>

        <Center>
          <GridItem w={["80%", "50%"]}>
            <Card>
              <CardHeader>
                <EmailIcon w="8" h="8" />
                <Heading size={"lg"}>50</Heading> Applications
              </CardHeader>
              <CardBody>
                <Button colorScheme="blue" size={["sm", "lg"]}>
                  View Here
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </Center>
      </Grid>
    </>
  )
}

export default Dashboard
