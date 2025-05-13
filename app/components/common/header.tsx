"use client";
import {
  ActionIcon,
  Avatar,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Grid,
  GridCol,
  Group,
  Indicator,
  List,
  ListItem,
  Menu,
  MenuDropdown,
  MenuTarget,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import WordMark from "./word-mark";
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { cssBreakPoints, DEFAULT_CURRENCY } from "@/app/lib/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import avatar from "../../assets/image-avatar.png";
import Image from "next/image";
import { useProducts } from "@/app/contexts/product-context";
const Header = () => {
  const currentPathName = usePathname();
  const navLinks = [
    {
      title: "Collections",
      to: "/collections",
      active: currentPathName === "/collections",
    },
    { title: "Men", to: "/men", active: currentPathName === "/men" },
    {
      title: "Women",
      to: "/women",
      active: currentPathName === "/women",
    },
    {
      title: "About",
      to: "/about",
      active: currentPathName === "/about",
    },
    {
      title: "Contact",
      to: "/contact",
      active: currentPathName === "/contact",
    },
  ];

  const isMediumScreen = useMediaQuery(
    `(max-width:${cssBreakPoints.TABLET_BREAKPOINT})`
  );

  const [isDrawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure();

  const { itemsInCart, setItemsInCart, products } = useProducts();

  return (
    <Flex
      justify={"space-between"}
      className="min-h-[5rem] md:border-b-1 border-dark-grayish-blue"
    >
      <Flex
        justify={{ base: "start", md: "space-between" }}
        className="w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]"
        gap={10}
        align={"center"}
      >
        {isMediumScreen && (
          <Burger opened={isDrawerOpened} onClick={openDrawer} />
        )}
        <Box className="flex items-center">
          <Link href={"/"}>
            <WordMark />
          </Link>
        </Box>
        {!isMediumScreen && (
          <List className="flex items-center gap-3 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.to}
                className={`h-full flex items-center ${
                  link.active && `border-b-2 orange-border`
                } hover:border-b-3 orange-border-on-hover`}
              >
                <ListItem className={`text-dark-grayish-blue`}>
                  {link.title}
                </ListItem>
              </Link>
            ))}
          </List>
        )}
      </Flex>
      <Group wrap="nowrap">
        <Menu styles={{ dropdown: { padding: 0 } }} withinPortal>
          <MenuTarget>
            <Indicator
              label={itemsInCart?.length ?? 0}
              size={16}
              inline
              color="orange"
            >
              <ActionIcon variant="transparent" color="black">
                <IconShoppingCart />
              </ActionIcon>
            </Indicator>
          </MenuTarget>
          <MenuDropdown
            classNames={{
              dropdown: `${isMediumScreen && `!w-screen !absolute`}`,
            }}
          >
            <Stack className="min-w-[10rem] min-h-[10rem] w-full" gap={3}>
              <Box className="p-3">
                <Text fw={"bold"} size="sm">
                  Cart
                </Text>
              </Box>
              <Divider w={"100%"} />
              <Stack className="p-3">
                {!itemsInCart.length ? (
                  <Box className="flex justify-center items-center h-full p-5 min-w-[15rem]">
                    <Text
                      fw={"bold"}
                      className="text-dark-grayish-blue"
                      size="xs"
                    >
                      Your cart is empty.
                    </Text>
                  </Box>
                ) : (
                  itemsInCart.map((item) => (
                    <Stack key={item.productId}>
                      <Grid className="w-full" align="center">
                        <GridCol span={2}>
                          <Image
                            src={
                              products?.find((x) => x.id === item.productId)
                                ?.images?.[0]?.thumbnail
                            }
                            alt="thumbnail"
                            className="rounded-md"
                            width={60}
                            height={60}
                          />
                        </GridCol>
                        <GridCol span={8}>
                          <Stack gap={1}>
                            <Text className="text-dark-grayish-blue" size="xs">
                              {
                                products?.find((x) => x.id === item.productId)
                                  ?.title
                              }
                            </Text>
                            <Group gap={5}>
                              <Text
                                className="text-dark-grayish-blue"
                                size="xs"
                              >
                                {DEFAULT_CURRENCY}
                                {`${products
                                  ?.find((x) => x.id === item.productId)
                                  ?.price.toFixed(2)} x ${item.quantity}`}
                              </Text>
                              <Text className="text-black" size="xs">
                                {DEFAULT_CURRENCY}
                                {(
                                  products?.find((x) => x.id === item.productId)
                                    ?.price ?? 0 * item.quantity
                                )?.toFixed(2)}
                              </Text>
                            </Group>
                          </Stack>
                        </GridCol>
                        <GridCol span={2}>
                          <ActionIcon
                            variant="transparent"
                            size={"xs"}
                            className="text-grayish-blue"
                            onClick={() => {
                              setItemsInCart(
                                itemsInCart?.filter(
                                  (x) => x.productId !== item.productId
                                )
                              );
                            }}
                          >
                            <IconTrash />
                          </ActionIcon>
                        </GridCol>
                      </Grid>
                      <Button className="bg-orange !text-xs" c={"black"} mt={2}>
                        Checkout
                      </Button>
                    </Stack>
                  ))
                )}
              </Stack>
            </Stack>
          </MenuDropdown>
        </Menu>
        <Avatar
          variant="transparent"
          color="black"
          className="hover:border-2 orange-border-on-hover cursor-pointer"
        >
          <Image src={avatar} alt="avatar" />
        </Avatar>
      </Group>
      <Drawer
        opened={isDrawerOpened}
        onClose={closeDrawer}
        title="sneakers"
        classNames={{ title: "!text-dark-blue !fw-bolder" }}
      >
        <List className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <ListItem
              key={link.title}
              className="text-dark-grayish-blue"
              onClick={closeDrawer}
            >
              {link.title}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Flex>
  );
};

export default Header;
