// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Deploy this contract on Scroll Sepolia

// Importing OpenZeppelin contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// Importing Chainlink contracts
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract GamePriceSVG is ERC721, ERC721URIStorage  {

    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter public tokenIdCounter;

    // Create price feed
    AggregatorV3Interface internal priceFeedBtc;
    AggregatorV3Interface internal priceFeedETH;
    AggregatorV3Interface internal priceFeedLink;



    // https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1
    /**
     * Network: Scroll Sepolia
     * Aggregator: BTC/USD
     */
  
   address btcuscAddress = 0x87dce67002e66C17BC0d723Fe20D736b80CAaFda;
    address ethusdAddress = 0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41;
    address linkusdAddress = 0xaC3E04999aEfE44D508cB3f9B972b0Ecd07c1efb;


    constructor() ERC721("Price Feed SVG", "pfSVG") {
        priceFeedBtc = AggregatorV3Interface(btcuscAddress);
        priceFeedETH = AggregatorV3Interface(ethusdAddress);
        priceFeedLink = AggregatorV3Interface(linkusdAddress);
    }




    function getBtcPrice() public view returns (uint256) {
        (, int256 price, , , ) = priceFeedBtc.latestRoundData();
        return uint256(price);
    }

       function getETHPrice() public view returns (uint256) {
        (, int256 price, , , ) = priceFeedETH.latestRoundData();
        return uint256(price);
    }

     function getLinkPrice() public view returns (uint256) {
        (, int256 price, , , ) = priceFeedLink.latestRoundData();
        return uint256(price);
    }

   // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // The following function is an override required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }
  
}