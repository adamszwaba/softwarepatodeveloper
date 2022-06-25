import { HamburgerIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  IconButton,
  Link,
  Text,
  useColorMode,
  Stack,
  Drawer,
  DrawerOverlay,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { Link as RemixLink } from '@remix-run/react';

const links = [
  { name: 'articles', href: '/articles' },
  { name: 'about us', href: '/about-us' },
];

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isBiggerThanMd = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
  });

  return (
    <Box
      as="nav"
      boxShadow="sm"
      backgroundColor={
        colorMode === 'dark' ? 'blackAlpha.100' : 'whiteAlpha.100'
      }
    >
      <Container
        maxW="container.lg"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="14"
      >
        <Link
          as={RemixLink}
          variant="xl"
          to="/"
          css={{
            ':hover': {
              textDecoration: 'none',
            },
          }}
        >
          software
          <Text fontSize="2xl" as="strong" color="orange.500">
            pato
          </Text>
          developer
        </Link>
        {!isBiggerThanMd && (
          <IconButton
            onClick={() => {
              onOpen();
            }}
            variant="ghost"
            aria-label="menu"
            icon={<HamburgerIcon />}
          />
        )}
        {isBiggerThanMd && (
          <Stack as="ul" height="100%" direction="row" alignItems="center">
            {links.map(({ name, href }) => (
              <Link
                textTransform="uppercase"
                key={name}
                fontSize="sm"
                as={RemixLink}
                to={href}
              >
                {name}
              </Link>
            ))}
          </Stack>
        )}
      </Container>
      {isBiggerThanMd && (
        <Flex position="absolute" right="0" height="14" width="14" top="0">
          <IconButton
            size="sm"
            alignSelf="center"
            aria-label="color mode toggle"
            rounded="full"
            variant="outline"
            onClick={toggleColorMode}
            color={colorMode === 'dark' ? 'orange.400' : 'blue.400'}
            icon={<SunIcon />}
          ></IconButton>
        </Flex>
      )}
      <Drawer isOpen={isOpen} onClose={onClose} size="full" placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Link
              as={RemixLink}
              variant="xl"
              to="/"
              css={{
                ':hover': {
                  textDecoration: 'none',
                },
              }}
            >
              software
              <Text fontSize="2xl" as="strong" color="orange.500">
                pato
              </Text>
              developer
            </Link>
          </DrawerHeader>

          <DrawerBody>
            <Stack as="ul" height="100%">
              {links.map(({ name, href }) => (
                <Link
                  textTransform="uppercase"
                  key={name}
                  fontSize="sm"
                  as={RemixLink}
                  to={href}
                >
                  {name}
                </Link>
              ))}
            </Stack>
          </DrawerBody>

          <DrawerFooter justifyContent="center">
            <Button variant="outline" mr={3} onClick={toggleColorMode}>
              Toggle color mode
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
