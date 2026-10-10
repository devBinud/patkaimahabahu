import primeAssamThumb from '../assets/gallery/media/videos/prime-assam-first-home.jpg'
import news18Thumb from '../assets/gallery/media/videos/news18-assam-homes.jpg'
import live24Thumb from '../assets/gallery/media/videos/24live-family-moves-in.jpg'
import theTruthThumb from '../assets/gallery/media/videos/the-truth-betbari-home.jpg'
import ajirSangbadThumb from '../assets/gallery/media/videos/ajir-sangbad-50-homes.jpg'
import crosswordNewsThumb from '../assets/gallery/media/videos/crossword-news-50-homes.jpg'
import news18ReelThumb from '../assets/gallery/media/videos/news18-reel-family-moves-in.jpg'
import newzNowThumb from '../assets/gallery/media/videos/newznow-first-of-50.jpg'
import crossCurrentThumb from '../assets/gallery/media/videos/cross-current-50-homes.jpg'
import nbNewsThumb from '../assets/gallery/media/videos/nb-news-betbari-home.jpg'

// Video / digital news coverage, shared by the homepage media slider and the
// News & Media page. Thumbnails are saved locally because
// Facebook's image URLs expire. To add a video, append an entry here;
// `platform` names the site in the thumbnail link's accessible label.
// `thumbPosition` (optional CSS object-position) picks which part of a
// square or vertical reel thumbnail shows in the card's 16:9 frame.
export const videoCoverage = [
  {
    id: 'vid-prime-assam-first-home',
    platform: 'Facebook',
    source: 'PRIME ASSAM Digital',
    title: 'First Home Handed Over to a Flood-Affected Family in Sivasagar',
    desc: 'PRIME ASSAM Digital reports on the foundation’s plan to build homes for 50 families left homeless by the floods, and the handover of the first house, built at a cost of about ₹2 lakh, in Betbari, Sivasagar.',
    thumbnail: primeAssamThumb,
    link: 'https://www.facebook.com/share/v/1LeNzhzTco/'
  },
  {
    id: 'vid-news18-assam-homes',
    platform: 'YouTube',
    source: 'News18 Assam / Northeast',
    title: 'Noble Gesture: Patkai Mahabahu Foundation Builds Homes for Flood-Affected Families in Assam',
    desc: 'News18 Assam covers the foundation’s initiative to build new homes for 50 families left homeless by the floods in Upper Assam, beginning with the first house in Betbari, Sivasagar, opened in the presence of local dignitaries.',
    thumbnail: news18Thumb,
    link: 'https://youtu.be/CIZp6tBkDxA'
  },
  {
    id: 'vid-24live-family-moves-in',
    platform: 'Facebook',
    source: '24 Live',
    title: 'Flood-Affected Family Moves Into Their New Home in Sivasagar',
    desc: '24 Live reports from Betbari, Sivasagar, where the family receiving the first house, built at a cost of about ₹2 lakh under the foundation’s plan to build homes for 50 flood-affected families, moved in with a traditional lamp-lighting ceremony.',
    thumbnail: live24Thumb,
    link: 'https://www.facebook.com/share/v/19aoGPeNTG/'
  },
  {
    id: 'vid-the-truth-betbari-home',
    platform: 'Facebook',
    source: 'The Truth',
    title: 'Plan to Build Homes for 50 Flood-Displaced Families Begins in Betbari',
    desc: 'The Truth reports on the first house, built at a cost of about ₹2 lakh in Betbari, Sivasagar, under the foundation’s plan to rehouse 50 families left homeless by the floods, as the family moves in with a lamp-lighting ceremony.',
    thumbnail: theTruthThumb,
    link: 'https://www.facebook.com/share/v/1JZVJ3XeQi/'
  },
  {
    id: 'vid-ajir-sangbad-50-homes',
    platform: 'Facebook',
    source: 'Ajir Sangbad 24x7',
    title: 'Foundation Plans Homes for 50 Families Left Homeless by the Floods',
    desc: 'Ajir Sangbad 24x7 reports on Patkai Mahabahu Foundation’s plan to build new homes for 50 families who lost their houses in the floods.',
    thumbnail: ajirSangbadThumb,
    link: 'https://www.facebook.com/share/v/1E4apiGpZr/'
  },
  {
    id: 'vid-crossword-news-50-homes',
    platform: 'Facebook',
    source: 'Cross Word News',
    title: 'A Generous Plan to Rebuild Homes for 50 Flood-Hit Families',
    desc: 'Cross Word News, Sivasagar, covers the foundation’s plan to build homes for 50 families made homeless by the floods.',
    thumbnail: crosswordNewsThumb,
    link: 'https://www.facebook.com/share/v/1FNFNBw9YU/'
  },
  {
    id: 'vid-news18-reel-family-moves-in',
    platform: 'Facebook',
    source: 'News18 Assam & NE',
    title: 'Plan for 50 Homes Becomes Reality as the First Family Moves In',
    desc: 'News18 Assam & NE reports that the foundation has turned its plan to rebuild homes for 50 families left homeless by the Upper Assam floods into reality, as the family entered the first house, built for about ₹2 lakh, with an emotional lamp-lighting.',
    thumbnail: news18ReelThumb,
    link: 'https://www.facebook.com/share/v/1DkpiYTasm/'
  },
  {
    id: 'vid-newznow-first-of-50',
    platform: 'Facebook',
    source: 'NewzNow',
    title: 'First of 50 Homes Built, 49 More Planned Across Sivasagar, Charaideo and Jorhat',
    desc: 'NewzNow reports that the family of a former state footballer moved into the first house, built for about ₹2 lakh, with 49 more homes to be built in Sivasagar, Charaideo and Jorhat.',
    thumbnail: newzNowThumb,
    link: 'https://www.facebook.com/reel/1123654953393324/'
  },
  {
    id: 'vid-cross-current-50-homes',
    platform: 'Facebook',
    source: 'The Cross Current',
    title: 'Homes for 50 Flood-Displaced Families at About ₹2 Lakh Each',
    desc: 'The Cross Current reports that the first house has been built in Betbari, Sivasagar, under the foundation’s plan to build homes for 50 families left homeless by the floods, with about ₹2 lakh to be spent on each house.',
    thumbnail: crossCurrentThumb,
    thumbPosition: 'center top',
    link: 'https://www.facebook.com/share/v/19txcmNQcL/'
  },
  {
    id: 'vid-nb-news-betbari-home',
    platform: 'Facebook',
    source: 'NB News',
    title: 'Why the New Home in Betbari, Sivasagar Is Drawing Attention',
    desc: 'NB News looks at the elevated house built in Betbari, Sivasagar, which stands out among the homes being rebuilt for flood-affected families in Upper Assam, and the goal of building 50 such homes.',
    thumbnail: nbNewsThumb,
    link: 'https://www.facebook.com/share/v/19SQ5xCSAg/'
  }
]
