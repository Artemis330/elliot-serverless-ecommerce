import Link from "next/link";
import { FormattedMessage } from "react-intl";
// import Stars from "components/common/Stars";
import Button from "components/common/Button";
// import Label from "../Label";
import {
	Wrapper,
	Thumbnail,
	Content,
	Header,
	Details,
	Body,
	Footer
} from "./styles";
import NumberFormat from "react-number-format";
import { useCurrency } from "providers/CurrencyProvider";

export default ({
	slug,
	name,
	description,
	images,
	// gender,
	skus,
	onClick,
	locale
}) => {
	const { state: currency, exchangeRate, loading } = useCurrency();

	return (
		<Wrapper>
			<Thumbnail>
				<Link href="/[lang]/product/[slug]" as={`/${locale}/product/${slug}`}>
					<a>
						{images?.edges?.length > 1 ? (
							images.edges.map(({ node }) => (
								<img
									key={node.id}
									src={`${process.env.ELLIOT_BASE_IMAGE_URL}${node.image}`}
									alt={name}
								/>
							))
						) : (
							<>
								<img
									src={`${process.env.ELLIOT_BASE_IMAGE_URL}${images.edges[0].node.image}`}
									alt={name}
								/>
								<img
									src={`${process.env.ELLIOT_BASE_IMAGE_URL}${images.edges[0].node.image}`}
									alt={name}
								/>
							</>
						)}
					</a>
				</Link>
				{/* <Label>
						<span>Sale</span>
					</Label> */}
			</Thumbnail>
			<Content>
				<Header>
					<Details>
						<Link
							href="/[lang]/product/[slug]"
							as={`/${locale}/product/${slug}`}
						>
							<a>
								<h2>{name}</h2>
							</a>
						</Link>
						{skus?.edges[0]?.node?.salePrice && (
							<p>
								{loading ? (
									"..."
								) : (
									<NumberFormat
										value={(skus.edges[0].node.salePrice * exchangeRate) / 100}
										displayType={"text"}
										thousandSeparator={true}
										prefix={currency}
									/>
								)}
							</p>
						)}
					</Details>
					{/* <div>
					<Stars stars={stars} />
				</div> */}
				</Header>
				<Body dangerouslySetInnerHTML={{ __html: description }} />
				<Footer>
					<Button onClick={onClick} type="button" variant="primary">
						<FormattedMessage id="button.add_to_cart" />
					</Button>
				</Footer>
			</Content>
		</Wrapper>
	);
};
