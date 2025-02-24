// Ingredients.jsx
import React, { useReducer } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import AccessibleModal from "./AccessibleModal";

// ----------------------------------------------------------------------
// Design System Tokens (these can be centralized in a separate theme file)
const theme = {
  primary: "hsl(33, 50%, 90%)", // Background
  secondary: "hsl(33, 50%, 10%)", // Text
  tertiary: "hsl(333, 80%, 20%)", // Interactive elements (buttons, small accents)
  accent: "hsl(93, 80%, 20%)", // Hover accents and highlights
};

// ----------------------------------------------------------------------
// Scalable SVG Icon Components using a centralized IconWrapper
const IconWrapper = styled.svg`
  width: 24px;
  height: 24px;
  fill: currentColor;
`;

// Filled Heart Icon (for favorites)
const FavoritesIcon = (props) => (
  <IconWrapper viewBox="0 0 24 24" {...props}>
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
      2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 
      16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </IconWrapper>
);

// Outline Heart Icon (for non-favorites)
const UnfavoriteIcon = (props) => (
  <IconWrapper viewBox="0 0 24 24" {...props}>
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
         2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
         14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
         11.54L12 21.35z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </IconWrapper>
);

// Other SVG icons for controls
const ClearIcon = (props) => (
  <IconWrapper viewBox="0 0 24 24" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
  </IconWrapper>
);

const SortAscIcon = (props) => (
  <IconWrapper viewBox="0 0 24 24" {...props}>
    <polyline
      points="18 15 12 9 6 15"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </IconWrapper>
);

const SortDescIcon = (props) => (
  <IconWrapper viewBox="0 0 24 24" {...props}>
    <polyline
      points="6 9 12 15 18 9"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </IconWrapper>
);

const ListIcon = (props) => (
  <IconWrapper viewBox="0 0 24 24" {...props}>
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-8h14V7H7v2z" />
  </IconWrapper>
);

// ----------------------------------------------------------------------
// Sample ingredient data
const ingredientsData = [
  {
    id: 1,
    name: "Raw Peanuts",
    description: "1 cup, lightly toasted and unsalted",
  },
  {
    id: 2,
    name: "Muscovado Sugar",
    description: "1/3 cup, for rich caramel notes",
  },
  {
    id: 3,
    name: "White Granulated Sugar",
    description: "1/6 cup, balancing the sweetness",
  },
  { id: 4, name: "Water", description: "2 tablespoons" },
  {
    id: 5,
    name: "Unsalted Butter",
    description: "1 tablespoon, for a smooth texture",
  },
  {
    id: 6,
    name: "Culinary-Grade Matcha Powder",
    description: "3/4 teaspoon, sifted",
  },
  { id: 7, name: "Fine Salt", description: "1/4 teaspoon, enhancing flavors" },
  {
    id: 8,
    name: "Baking Soda",
    description: "1/4 teaspoon, for a light crunch",
  },
  {
    id: 9,
    name: "Vanilla Extract",
    description: "1/8 teaspoon, for subtle aroma",
    optional: true,
  },
];

// ----------------------------------------------------------------------
// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ----------------------------------------------------------------------
// Styled Components (externalizing all styling)
const Container = styled.section`
  background-color: var(--color-primary, ${theme.primary});
  color: var(--color-secondary, ${theme.secondary});
  padding: 3rem 1rem;
  min-height: 100vh;
  transition: background-color 0.3s ease;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  opacity: 0.7;
  margin-bottom: 1.5rem;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  max-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid var(--color-secondary, ${theme.secondary});
  border-radius: 0.5rem;
  font-size: 1rem;
  color: var(--color-secondary, ${theme.secondary});
  background-color: var(--color-primary, ${theme.primary});
  transition: box-shadow 0.2s ease;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-accent, ${theme.accent});
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-secondary, ${theme.secondary});
  &:hover {
    color: var(--color-accent, ${theme.accent});
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: var(--color-accent, ${theme.accent});
  color: var(--color-primary, ${theme.primary});
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
  &:hover {
    background-color: var(--color-accent, ${theme.accent});
    transform: translateY(-2px);
  }
  &:active {
    transform: scale(0.97);
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  transition: all 0.3s ease-in-out;
`;

const Card = styled.div`
  background-color: var(--color-primary, ${theme.primary});
  border: 1px solid var(--color-secondary, ${theme.secondary});
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease forwards;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  display: flex;
  font-weight: semibold;
  align-items: center;
  gap: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const OptionalLabel = styled.span`
  font-size: 0.8rem;
  opacity: 0.7;
`;

// ----------------------------------------------------------------------
// State Management using useReducer
const initialState = {
  searchTerm: "",
  selectedIngredient: null,
  favoriteIds: [],
  sortAscending: true,
  showFavoritesOnly: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_SELECTED_INGREDIENT":
      return { ...state, selectedIngredient: action.payload };
    case "TOGGLE_FAVORITE":
      const { id } = action.payload;
      return {
        ...state,
        favoriteIds: state.favoriteIds.includes(id)
          ? state.favoriteIds.filter((favId) => favId !== id)
          : [...state.favoriteIds, id],
      };
    case "TOGGLE_SORT_ORDER":
      return { ...state, sortAscending: !state.sortAscending };
    case "TOGGLE_FAVORITES_ONLY":
      return { ...state, showFavoritesOnly: !state.showFavoritesOnly };
    default:
      return state;
  }
};

// ----------------------------------------------------------------------
// IngredientCard Component using standardized SVG icons
const IngredientCard = ({
  ingredient,
  onSelect,
  isFavorite,
  onFavoriteToggle,
}) => {
  const { id, name, description, optional } = ingredient;
  return (
    <Card onClick={() => onSelect(ingredient)}>
      <CardTitle>
        {name}
        {isFavorite && <FavoritesIcon />}
        {optional && <OptionalLabel>(Optional)</OptionalLabel>}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
      {/* This button will push to the bottom */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteToggle(id);
        }}
        style={{ marginTop: "auto" }}
      >
        {isFavorite ? (
          <>
            <FavoritesIcon /> Favorited
          </>
        ) : (
          <>
            <UnfavoriteIcon /> Add to Favorites
          </>
        )}
      </Button>
    </Card>
  );
};

IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    optional: PropTypes.bool,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
  onFavoriteToggle: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------
// Main Ingredients Component
const Ingredients = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    searchTerm,
    selectedIngredient,
    favoriteIds,
    sortAscending,
    showFavoritesOnly,
  } = state;

  const filteredIngredients = ingredientsData
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFavorite = showFavoritesOnly
        ? favoriteIds.includes(item.id)
        : true;
      return matchesSearch && matchesFavorite;
    })
    .sort((a, b) =>
      sortAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <Container id="ingredients">
      <Header>
        <Title>Ingredients</Title>
        <Subtitle>
          We believe in authenticity and transparency. Here’s exactly what goes
          into every bite of Nutcha Bites:
        </Subtitle>
      </Header>
      <Controls>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
            }
            aria-label="Search ingredients"
          />
          {searchTerm && (
            <ClearButton
              onClick={() => dispatch({ type: "SET_SEARCH_TERM", payload: "" })}
              aria-label="Clear search"
            >
              <ClearIcon />
            </ClearButton>
          )}
        </SearchInputWrapper>
        <Button
          onClick={() => dispatch({ type: "TOGGLE_SORT_ORDER" })}
          aria-label="Toggle sort order"
        >
          {sortAscending ? <SortAscIcon /> : <SortDescIcon />} Sort
        </Button>
        <Button
          onClick={() => dispatch({ type: "TOGGLE_FAVORITES_ONLY" })}
          aria-label="Toggle favorites filter"
        >
          {showFavoritesOnly ? <FavoritesIcon /> : <ListIcon />}{" "}
          {showFavoritesOnly ? "Favorites" : "All"}
        </Button>
      </Controls>
      {filteredIngredients.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.7 }}>
          No ingredients found.
        </p>
      ) : (
        <Grid>
          {filteredIngredients.map((item) => (
            <IngredientCard
              key={item.id}
              ingredient={item}
              onSelect={(ingredient) =>
                dispatch({
                  type: "SET_SELECTED_INGREDIENT",
                  payload: ingredient,
                })
              }
              isFavorite={favoriteIds.includes(item.id)}
              onFavoriteToggle={(id) =>
                dispatch({ type: "TOGGLE_FAVORITE", payload: { id } })
              }
            />
          ))}
        </Grid>
      )}
      {selectedIngredient && (
        <AccessibleModal
          isOpen={Boolean(selectedIngredient)}
          onClose={() =>
            dispatch({ type: "SET_SELECTED_INGREDIENT", payload: null })
          }
          title={selectedIngredient.name}
          description={selectedIngredient.description}
        >
          {selectedIngredient.optional && (
            <p style={{ fontStyle: "italic", opacity: 0.7 }}>
              This ingredient is optional.
            </p>
          )}
          <Button
            onClick={() =>
              dispatch({
                type: "TOGGLE_FAVORITE",
                payload: { id: selectedIngredient.id },
              })
            }
          >
            {favoriteIds.includes(selectedIngredient.id) ? (
              <>
                <FavoritesIcon /> Favorited
              </>
            ) : (
              <>
                <UnfavoriteIcon /> Add to Favorites
              </>
            )}
          </Button>
        </AccessibleModal>
      )}
    </Container>
  );
};

export default Ingredients;
