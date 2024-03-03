import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

export interface Laptop {
  name: string;
  original_price: number;
  discounted_price: number | null;
  absolute_savings: number;
  relative_savings: number;
  url: string;
  shop: string;
  images: string | null;
  brand: string;
}

export default function LaptopCard(props: Laptop) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ maxWidth: "250px" }}
    >
      <Card.Section>
        <Image
          src={`./src/assets/${props.images}`}
          height={160}
          fit="contain"
          alt="Can't load laptop image"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text
          fw={500}
          lineClamp={3}
          style={{
            height: "70px",
          }}
        >
          {props.name}
        </Text>
        {props.relative_savings !== 0 ? (
          <Badge color="red">On Sale {props.relative_savings * 100}% off</Badge>
        ) : (
          <Badge color="white"></Badge>
        )}
      </Group>

      <Text size="md" ta="center">
        Price:{" "}
        {props.relative_savings !== 0
          ? props.discounted_price
          : props.original_price}
        &nbsp;RSD
      </Text>

      <a href={props.url} style={{ textDecoration: "none" }}>
        <Button color="blue" fullWidth mt="md" radius="md">
          Visit on original site
        </Button>
      </a>
    </Card>
  );
}
