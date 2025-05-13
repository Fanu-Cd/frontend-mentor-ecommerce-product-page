"use client";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridCol,
  Group,
  Portal,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  IconCheck,
  IconEye,
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconX,
} from "@tabler/icons-react";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { useProducts } from "../contexts/product-context";
import { cssBreakPoints, DEFAULT_CURRENCY } from "../lib/utils/constants";
import { useMediaQuery } from "@mantine/hooks";

const LandingPage = () => {
  const { products, itemsInCart, setItemsInCart } = useProducts();
  const productForView = useMemo(() => products?.[0], [products]);

  const [selectedProductImage, setSelectedProductImage] = useState<{
    id: number | null;
  }>({
    id: productForView?.images?.[0]?.id,
  });
  const [selectedProductForOverlay, setSelectedProductForOverLay] = useState<
    number | undefined
  >(1);
  const [itemsCountToAddToCart, setItemsCountToAddToCart] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlideForMedScreenCarousel, setActiveSlideForMedScreenCarousel] =
    useState(0);
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  const isMediumScreen = useMediaQuery(
    `(max-width:${cssBreakPoints.TABLET_BREAKPOINT})`
  );

  return (
    <Box className={isMediumScreen ? "p-0" : "p-3"} mt={{ sm: 0, md: 50 }}>
      {isMediumScreen ? (
        <Stack>
          <Carousel
            className="w-full"
            styles={{
              control: {
                background: "white",
                width: "2rem",
                height: "2rem",
              },
            }}
            classNames={{ control: `orange-on-hover` }}
            initialSlide={activeSlideForMedScreenCarousel}
            onSlideChange={(x) => {
              setActiveSlideForMedScreenCarousel(x);
            }}
          >
            {productForView?.images?.map((productImage) => (
              <CarouselSlide key={productImage.id} className="w-full">
                <Image
                  src={productImage.thumbnail}
                  className="md:rounded-md object-cover w-full md:w-[85%] mx-auto h-[350px]"
                  alt="Thumbnail"
                />
              </CarouselSlide>
            ))}
          </Carousel>
          <Stack className="w-full p-3 md:p-0 md:max-w-[300px]" gap={3} mt={20}>
            <Text className="text-dark-grayish-blue" size="sm">
              {productForView?.company}
            </Text>
            <Text className="text-black" fw={"bold"} size="1.5rem" mt={10}>
              {productForView?.title}
            </Text>
            <Text className="text-dark-grayish-blue" size="xs" mt={15}>
              {productForView?.description}
            </Text>
            <Flex mt={15} align="center" justify={"space-between"}>
              <Group>
                <Text fw={"bold"}>
                  {DEFAULT_CURRENCY}
                  {productForView?.price?.toFixed(2)}
                </Text>
                <Box className="bg-black p-1 text-xs rounded-md" c={"white"}>
                  {productForView?.discount}%
                </Box>
              </Group>
              <Text
                className="text-dark-grayish-blue !line-through"
                size="sm"
                fw={"bold"}
              >
                {DEFAULT_CURRENCY}
                {(
                  productForView?.price *
                  (100 / productForView?.discount)
                )?.toFixed(2)}
              </Text>
            </Flex>

            <Flex
              mt={15}
              direction={"column"}
              className="w-full"
              align={"center"}
              gap={20}
            >
              <Box className="w-full rounded-md bg-light-grayish-blue h-[30px] p-2 flex justify-center">
                <Group
                  justify="space-between"
                  className="w-full"
                  align="center"
                >
                  <ActionIcon
                    variant="transparent"
                    className="text-orange"
                    size={"xs"}
                    disabled={!itemsCountToAddToCart}
                    onClick={() => {
                      setItemsCountToAddToCart((prev) => prev - 1);
                    }}
                  >
                    <IconMinus />
                  </ActionIcon>
                  <Text fw={"bold"} size="xs">
                    {itemsCountToAddToCart}
                  </Text>
                  <ActionIcon
                    variant="transparent"
                    className="text-orange"
                    size={"xs"}
                    onClick={() => {
                      setItemsCountToAddToCart((prev) => prev + 1);
                    }}
                  >
                    <IconPlus />
                  </ActionIcon>
                </Group>
              </Box>
              <Box className="w-full">
                <Button
                  className="bg-pale-orange !text-xs w-full"
                  c={"black"}
                  fullWidth
                  disabled={!itemsCountToAddToCart}
                  leftSection={
                    itemsInCart?.some(
                      (x) => x.productId === productForView?.id
                    ) ? (
                      <IconCheck size={"0.9rem"} />
                    ) : (
                      <IconShoppingCart size={"0.9rem"} />
                    )
                  }
                  onClick={() => {
                    const isItemInCart = itemsInCart?.some(
                      (x) => x.productId === productForView?.id
                    );
                    if (isItemInCart) {
                      setItemsInCart(
                        itemsInCart?.filter(
                          (x) => x.productId !== productForView?.id
                        )
                      );
                      setItemsCountToAddToCart(0);
                    } else {
                      setItemsInCart([
                        ...itemsInCart,
                        {
                          productId: productForView.id,
                          quantity: Number(itemsCountToAddToCart),
                        },
                      ]);
                    }
                  }}
                >
                  {itemsInCart?.some((x) => x.productId === productForView?.id)
                    ? "Added to cart"
                    : "Add to cart"}
                </Button>
              </Box>
            </Flex>
          </Stack>
        </Stack>
      ) : (
        <Grid className="w-full">
          <GridCol span={6}>
            <Stack className="max-w-[300px]">
              <Box>
                <Image
                  src={
                    productForView?.images?.find(
                      (x) => x.id === selectedProductImage.id
                    )?.thumbnail
                  }
                  className="rounded-md object-cover w-full h-[270px]"
                  alt="Thumbnail"
                />
              </Box>
              <SimpleGrid cols={4}>
                {productForView?.images?.map((productImage) => (
                  <Box
                    key={productForView?.id}
                    className={`w-full ${
                      selectedProductImage.id === productImage.id &&
                      `outline-[2px] orange-outline rounded-md`
                    } cursor-pointer`}
                    onClick={() => {
                      setSelectedProductImage({ id: productImage.id });
                    }}
                  >
                    <Image
                      src={productImage.thumbnail}
                      className="rounded-md object-cover w-full h-[60px]"
                      alt="Thumbnail"
                    />
                  </Box>
                ))}
              </SimpleGrid>
              <Button
                leftSection={<IconEye size={"0.9rem"} />}
                variant="transparent"
                className="bg-dark-grayish-blue text-white"
                size="xs"
                onClick={() => {
                  setIsPreviewActive(true);
                }}
              >
                Preview
              </Button>
            </Stack>
          </GridCol>
          <GridCol span={6}>
            <Stack className="max-w-[300px]" gap={3} mt={20}>
              <Text className="text-dark-grayish-blue" size="sm">
                {productForView?.company}
              </Text>
              <Text className="text-black" fw={"bold"} size="1.5rem" mt={10}>
                {productForView?.title}
              </Text>
              <Text className="text-dark-grayish-blue" size="xs" mt={15}>
                {productForView?.description}
              </Text>
              <Group mt={15} align="center">
                <Text fw={"bold"}>
                  {DEFAULT_CURRENCY}
                  {productForView?.price?.toFixed(2)}
                </Text>
                <Box className="bg-black p-1 text-xs rounded-md" c={"white"}>
                  {productForView?.discount}%
                </Box>
              </Group>
              <Text
                className="text-dark-grayish-blue !line-through"
                size="sm"
                fw={"bold"}
              >
                {DEFAULT_CURRENCY}
                {(
                  productForView?.price *
                  (100 / productForView?.discount)
                )?.toFixed(2)}
              </Text>
              <Flex mt={15} className="w-full" align={"center"} gap={20}>
                <Box className="p-2 rounded-md bg-light-grayish-blue">
                  <Group>
                    <ActionIcon
                      variant="transparent"
                      className="text-orange"
                      size={"xs"}
                      disabled={!itemsCountToAddToCart}
                      onClick={() => {
                        setItemsCountToAddToCart((prev) => prev - 1);
                      }}
                    >
                      <IconMinus />
                    </ActionIcon>
                    <Text fw={"bold"} size="xs">
                      {itemsCountToAddToCart}
                    </Text>
                    <ActionIcon
                      variant="transparent"
                      className="text-orange"
                      size={"xs"}
                      onClick={() => {
                        setItemsCountToAddToCart((prev) => prev + 1);
                      }}
                    >
                      <IconPlus />
                    </ActionIcon>
                  </Group>
                </Box>
                <Box>
                  <Button
                    className="bg-pale-orange !text-xs"
                    c={"black"}
                    mt={2}
                    disabled={!itemsCountToAddToCart}
                    leftSection={
                      itemsInCart?.some(
                        (x) => x.productId === productForView?.id
                      ) ? (
                        <IconCheck size={"0.9rem"} />
                      ) : (
                        <IconShoppingCart size={"0.9rem"} />
                      )
                    }
                    onClick={() => {
                      const isItemInCart = itemsInCart?.some(
                        (x) => x.productId === productForView?.id
                      );
                      if (isItemInCart) {
                        setItemsInCart(
                          itemsInCart?.filter(
                            (x) => x.productId !== productForView?.id
                          )
                        );
                        setItemsCountToAddToCart(0);
                      } else {
                        setItemsInCart([
                          ...itemsInCart,
                          {
                            productId: productForView.id,
                            quantity: Number(itemsCountToAddToCart),
                          },
                        ]);
                      }
                    }}
                  >
                    {itemsInCart?.some(
                      (x) => x.productId === productForView?.id
                    )
                      ? "Added to cart"
                      : "Add to cart"}
                  </Button>
                </Box>
              </Flex>
            </Stack>
          </GridCol>
        </Grid>
      )}
      {isPreviewActive && (
        <Portal>
          <Box
            pos="fixed"
            top={0}
            left={0}
            w="100vw"
            h="100vh"
            bg="rgba(0, 0, 0, 0.5)"
            style={{ zIndex: 1000 }}
          >
            <Center className="h-full">
              <Stack justify="center" align="center" className="w-[450px] ">
                <ActionIcon className="ms-auto mr-8" variant="transparent">
                  <IconX
                    className="text-white orange-on-hover"
                    onClick={() => {
                      setIsPreviewActive(false);
                    }}
                  />
                </ActionIcon>
                <Box className="w-full h-full">
                  <Carousel
                    className="w-full"
                    styles={{
                      control: {
                        background: "white",
                        width: "2rem",
                        height: "2rem",
                      },
                    }}
                    classNames={{ control: `orange-on-hover` }}
                    initialSlide={activeSlide}
                    onSlideChange={(x) => {
                      setActiveSlide(x);
                      setSelectedProductForOverLay(
                        productForView?.images?.find(
                          (x) => x.id === Number(activeSlide + 1)
                        )?.id
                      );
                    }}
                  >
                    {productForView?.images?.map((productImage) => (
                      <CarouselSlide key={productImage.id}>
                        <Image
                          src={productImage.thumbnail}
                          className="rounded-md object-cover w-[85%] mx-auto h-[350px]"
                          alt="Thumbnail"
                        />
                      </CarouselSlide>
                    ))}
                  </Carousel>
                </Box>
                <SimpleGrid cols={4}>
                  {productForView?.images?.map((productImage) => (
                    <Box
                      key={productImage?.id}
                      className={`w-full ${
                        selectedProductForOverlay === productImage?.id &&
                        `outline-[2px] orange-outline rounded-md`
                      } cursor-pointer`}
                      onClick={() => {
                        setSelectedProductForOverLay(productImage?.id);
                        setActiveSlide(productImage?.id - 1);
                      }}
                    >
                      <Image
                        src={productImage?.thumbnail}
                        className="rounded-md object-cover w-full h-[60px]"
                        alt="Thumbnail"
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>
            </Center>
          </Box>
        </Portal>
      )}
    </Box>
  );
};

export default LandingPage;
