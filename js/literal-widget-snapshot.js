const target = document.querySelector('.literal-widget');

// Set layout to "list" for mobile
const layoutStyle = matchMedia('only screen and (max-width: 760px)').matches ? "mobile" : "desktop";

// Add layout attribute
const layout = target.setAttribute("layout", layoutStyle);

//Find attributes
const variables = {
  handle: target.getAttribute('handle'),
  readingStatus: target.getAttribute('status'),
  limit: parseInt(target.getAttribute('limit')) || 20,
};

fetch('https://backend.literal.club/', {
  method: 'POST',
  mode: 'cors',
  headers: {
	'Content-Type': 'application/json',
  },
  body: JSON.stringify({
	query: `
		query booksByReadingStateAndHandle($limit: Int!, $offset: Int!, $readingStatus: ReadingStatus!, $handle: String!) {
			booksByReadingStateAndHandle(
				limit: $limit
				offset: $offset
				readingStatus: $readingStatus
				handle: $handle
			) {
				...BookParts
				__typename
			}
		}

		fragment BookParts on Book {
			id
			slug
			title
			subtitle
			description
			isbn10
			isbn13
			language
			pageCount
			publishedDate
			publisher
			physicalFormat
			cover
			authors {
				...AuthorMini
				__typename
			}
			gradientColors
			workId
			__typename
		}

		fragment AuthorMini on Author {
			id
			name
			slug
			__typename
		}
	`,
	variables: {
	  handle: variables.handle,
	  readingStatus: variables.readingStatus,
	  limit: variables.limit,
	  offset: 0,
	},
  }),
})
  .then((response) => {
	return response.json();
  })
  .then((response) => {
	const books = response.data.booksByReadingStateAndHandle || [];

	const formatter = new Intl.ListFormat('en', { style: 'short', type: 'conjunction' });

	const bookItems = books.map((book) => {
	  const authors = formatter.format(book.authors.map((a) => a.name));
	  const bookItem = document.createElement('div');
	  bookItem.classList.add('literal-book-item');
	  bookItem.innerHTML = `
			<a href="https://literal.club/${variables.handle}/book/${book.slug}?utm_source=${variables.handle}&utm_medium=widget" target="_blank">
				<div class="literal-book-item__inner">
					<div class="literal-book-item__image">
						<div class="literal-book-item__image_cover__outer">
							<img src="${book.cover}" alt="${book.title}" />
						</div>
					</div>
					<div class="literal-book-item__info">
						<div class="literal-book-item__title">
							${book.title}
						</div>
						<div class="literal-book-item__authors">
							${authors}
						</div>
					</div>
				</div>
			</a>
		`;
	  return bookItem;
	});

	target.append(...bookItems);
  });

let mobile = `
	.literal-widget {
		width: 100%;
		height: calc(((18vw / .66667) + 20px) * 5);
	}
	.literal-widget .literal-book-item {
		display: flex;
		position: relative;
	}
	.literal-widget .literal-book-item a {
		width: 100%;
		display: flex;
		margin: 10px 0;
		font-size: 1.44rem;
		line-height: 1.5;
		text-decoration: none;
	}
	.literal-widget .literal-book-item__inner {
		flex: 1 0;
		display: flex;
		align-items: center;
	}
	.literal-widget .literal-book-item__image {
		width: 18vw;
		height: auto;
		margin-right: var(--space);
	}
	.literal-widget .literal-book-item__image_cover__outer {
		position: relative;
		display: inline-block;
		line-height: 100%;
	}
	.literal-book-item__image_cover__outer::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 40%;
		border-radius: 8px;
		background:
			radial-gradient(ellipse at top, hsla(0, 0%, 100%, 40%) 0%, hsla(0, 0%, 100%, 15%) 40%, hsla(0, 0%, 100%, 0%) 70%);
		mix-blend-mode: luminosity;
		filter: blur(0.5px);
		-webkit-filter: blur(0.5px);
	}
	.literal-book-item__image_cover__outer::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		aspect-ratio: 2 / 3;
		border-radius: var(--border-radius-xxs);
		background:
			linear-gradient(to right, var(--color-light-shadow), var(--color-light-shadow) 2%, hsla(50, 43%, 99%, 64%) 2%, transparent 4%, var(--color-light-shadow) 6%, var(--color-light-shadow-weak) 8%, hsla(50, 43%, 99%, 64%) 8%, transparent 10%);
		mix-blend-mode: luminosity;
		box-shadow: inset 0px -1px 1px var(--color-light-shadow);
	}
	.literal-widget .literal-book-item__image_cover__outer img {
		display: inline-block;
		max-width: 100%;
		height: auto;
		aspect-ratio: 2 / 3;
		object-fit: cover;
		border-radius: var(--border-radius-xxs);
		vertical-align: middle;
		-webkit-transform: translateZ(0);
		box-shadow:
			0px 4px 4px -2px var(--color-light-shadow-heavy),
			0px -1px 8px 1px var(--color-light-shadow-weak);
	}
	.literal-widget .literal-book-item__info {
		flex: 1 0;
	}
	.literal-widget .literal-book-item__title {
		font-weight: 600;
	}
`;

let desktop = `
	.literal-widget .literal-book-item {
		display: flex;
		position: relative;
	}
	.literal-widget .literal-book-item a {
		width: 100%;
		display: flex;
		margin: 10px 0;
		font-size: 1.6rem;
		line-height: var(--line-height);
		text-decoration: none;
		cursor: alias;
	}
	.literal-widget .literal-book-item__inner {
		flex: 1 0;
		display: flex;
		align-items: center;
	}
	.literal-widget .literal-book-item__image {
		width: 15%;
		height: auto;
		margin-right: var(--space);
	}
	.literal-widget .literal-book-item__image_cover__outer {
		position: relative;
		display: inline-block;
		line-height: 100%;
	}
	.literal-book-item__image_cover__outer::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 40%;
		border-radius: 8px;
		background:
			radial-gradient(ellipse at top, hsla(0, 0%, 100%, 40%) 0%, hsla(0, 0%, 100%, 15%) 40%, hsla(0, 0%, 100%, 0%) 70%);
		mix-blend-mode: luminosity;
		filter: blur(0.5px);
		-webkit-filter: blur(0.5px);
	}
	.literal-book-item__image_cover__outer::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		aspect-ratio: 2 / 3;
		border-radius: var(--border-radius-xxs);
		background:
			linear-gradient(to right, var(--color-light-shadow), var(--color-light-shadow) 2%, hsla(50, 43%, 99%, 64%) 2%, transparent 4%, var(--color-light-shadow) 6%, var(--color-light-shadow-weak) 8%, hsla(50, 43%, 99%, 64%) 8%, transparent 10%);
		mix-blend-mode: luminosity;
		box-shadow: inset 0px -1px 1px var(--color-light-shadow);
	}
	.literal-widget .literal-book-item__image_cover__outer img {
		display: inline-block;
		max-width: 100%;
		height: auto;
		aspect-ratio: 2 / 3;
		object-fit: cover;
		border-radius: var(--border-radius-xxs);
		vertical-align: middle;
		-webkit-transform: translateZ(0);
		box-shadow:
			0px 4px 4px -2px var(--color-light-shadow-heavy),
			0px -1px 8px 1px var(--color-light-shadow-weak);
	}
	.literal-widget .literal-book-item__info {
		flex: 1 0;
	}
	.literal-widget .literal-book-item__title {
		font-weight: 600;
	}
`;

// .literal-widget .literal-book-item__image_cover__outer img {
// 	box-shadow: 0 4px 16px 4px hsla(var(--shadow), 10%), 0 20px 16px -16px hsla(var(--shadow), 40%);
// }

let styleSheet = document.createElement('style');

styleSheet.innerHTML = layoutStyle ===  "mobile" ? mobile : desktop;
document.head.appendChild(styleSheet);
