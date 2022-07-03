import logo from "./logo.svg"
import {
  Avatar,
  Box,
  Button,
  Center,
  createDisclosure,
  Flex,
  FormControl,
  FormLabel,
  HopeProvider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SelectContent,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectOptionIndicator,
  SelectOptionText,
  SelectPlaceholder,
  SelectTrigger,
  SelectValue,
  Text
} from "@hope-ui/solid"
import { createSignal, For } from "solid-js"
// import "./App.css"

function App() {
  return (
    <HopeProvider>
      <Flex color="white" height="100%" direction="column">
        <Box flex="1" bg="tomato">
          <Text>Leaderboard</Text>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            p="$5"
            fontWeight="600"
          >
            <Box flexBasis={"1em"}>1</Box>
            <Box>
              <Avatar
                name="Drew"
                src="https://avatars.dicebear.com/api/miniavs/male/3.svg"
              />
            </Box>
            <Box>Drew</Box>
            <Box>17pts</Box>
          </Flex>
        </Box>
        <Box flex="1" bg="$blackAlpha12">
          <NewUserModal />
          <Flex
            justifyContent="space-between"
            alignItems="center"
            p="$5"
            fontWeight="600"
          >
            <Box>
              <Box>May 15, 2023</Box>
              <Box>2:34pm</Box>
            </Box>
            <Box>Bombparty</Box>
            <Box>
              Users <UserSelect />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </HopeProvider>
  )
}

function UserSelect() {
  const [value, setValue] = createSignal(["Drew", "Mike", "Mandy"])

  return (
    <>
      <Select multiple value={value()} onChange={setValue}>
        <SelectTrigger>
          <SelectPlaceholder>Who attended?</SelectPlaceholder>
          <SelectValue />
          <SelectIcon />
        </SelectTrigger>
        <SelectContent>
          <SelectListbox>
            <For each={["Drew", "Mike", "Mandy"]}>
              {(item) => (
                <SelectOption value={item}>
                  <SelectOptionText>{item}</SelectOptionText>
                  <SelectOptionIndicator />
                </SelectOption>
              )}
            </For>
          </SelectListbox>
        </SelectContent>
      </Select>
    </>
  )
}

function NewUserModal() {
  const { isOpen, onOpen, onClose } = createDisclosure()

  return (
    <>
      <Button onClick={onOpen}>New User</Button>
      <Modal centered opened={isOpen()} initialFocus="#name" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Create user</ModalHeader>
          <ModalBody>
            <FormControl id="name" mb="$4">
              <FormLabel>Name</FormLabel>
              <Input placeholder="Name" />
            </FormControl>
            <FormControl id="points">
              <FormLabel>Points</FormLabel>
              <Input type="number" value={0} placeholder="points" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function Providers() {
  return (
    <HopeProvider>
      <App />
    </HopeProvider>
  )
}

export default Providers
