/**
 * @typedef {{cards: Number, medals: Number, mmedalsBronze: Number, medalsSilver: Number, medalsGold: Number}} Awards
 * @typedef {{played: Number, won: Number}} Games
 * @typedef {{awards: Awards, game: Games}} Stats
 * @typedef {{level: Number, role: String, roleIcon: String, rankIcon: String}} Rating
*/

/**
 * @typedef Profile
 * @property {Stats} conpetitiveStats
 * @property {Number} endorsement
 * @property {String} endorsementIcon
 * @property {Number} gamesWon
 * @property {String} icon
 * @property {Number} level
 * @property {String} levelIcon
 * @property {String} name
 * @property {Number} prestige
 * @property {String} prestigeIcon
 * @property {Boolean} private
 * @property {Stats} quickPlayStats
 * @property {Number} rating
 * @property {String} ratingIcon
 * @property {Rating[]} ratings
 */

/**
 * @typedef newProfile
 * @property {Profile} request
 * @property {{level: Number, endorsement: Number, endorsementIcon: String}} levels
 * @property {{tank: {level: Number, icon: String}, damage: {level: Number, icon: String}, support: {level: Number, icon: String}}} ranks
 * @property {String} battle_tag
 */

module.exports = { }