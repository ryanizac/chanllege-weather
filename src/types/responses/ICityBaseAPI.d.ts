type Match = Array<{ length: number; offset: number }>;

type StructuredFormatting = {
  main_text: string; // name
  main_text_matched_substrings?: Array<{ length: number; offset: number }>;
  secondary_text: string; // country
};

export default interface ICityBaseAPI {
  description?: stirng;
  matched_substrings?: Match;
  place_id: string; // id
  reference?: string;
  structured_formatting: StructuredFormatting;
  terms?: Match; // *see about it in the documentation below
  types?: string[];
}

// About terms
/**
 * type: string[]
 * antepenultimate: city name
 * penultimate item: state abbreviation;
 * last item: country name
 * terms: [
 *  { offset: 0; value: 'São Paulo'; },
 *  { offset: 11; value: 'SP'; },
 *  { offset: 15; value: 'Brasil'; }
 * ];
 */
