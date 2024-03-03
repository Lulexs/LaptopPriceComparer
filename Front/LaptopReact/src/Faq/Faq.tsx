import { Container, Title, Accordion } from "@mantine/core";
import classes from "./Faq.module.css";

export function Faq() {
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control>
            How does this site collect information about laptops?
          </Accordion.Control>
          <Accordion.Panel>
            Our site employs a sophisticated data collection system powered by
            Python. We utilize tools like Scrapy and Playwright to scrape laptop
            information from a multitude of websites. The gathered data is then
            stored efficiently in MongoDB. Our web API, crafted with Flask,
            ensures seamless interaction with this repository. It's worth noting
            that our scraping bots strictly adhere to the guidelines outlined in
            robots.txt files, ensuring respectful and responsible data
            acquisition practices that do not overwhelm servers with excessive
            requests.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>
            Can I search for laptops based on hardware specifications?
          </Accordion.Control>
          <Accordion.Panel>
            While it's a possibility for the future, it's currently challenging
            due to the varied formats different sites use to present laptop
            specifications. Many sites lack consistency in their data
            presentation, making it difficult to clean and extract clear
            information about hardware specifications. Implementing this feature
            would require significant effort to ensure accurate and reliable
            results.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
