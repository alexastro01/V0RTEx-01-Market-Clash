// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Deploy this contract on Scroll Sepolia

// Importing OpenZeppelin contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// Importing Chainlink contracts
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract MarketClash is ERC721, ERC721URIStorage  {

   //Events

   event openedPackByPlayer(uint indexed cardOne, uint indexed cardTwo, uint indexed cardThree);

  //pass array of enums
   enum Class {
        Btc,
        Eth,
        Link
    }

    struct Attr {
        Class Class; 
        uint8 attack;
        uint8 defence; 
    }



    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter public tokenIdCounter;
    
    //card mappings
    mapping(uint256 => Attr) public attributes;
    mapping(uint256 => string) public imageMapping;
    mapping(uint256 => string) public classMapping;
    mapping(uint256 => uint256) public tokenIdAttack;
    mapping(uint256 => uint256) public tokenIdDefense;
    mapping(address => uint[]) public recentOpenedPackByPlayer;
    

    //player mappings
    mapping(address => uint[]) public deckOfPlayer;


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

    uint highMultiplier = 3;
    uint mediumMultiplier = 2;
    uint lowMultiplier = 1;

    string btcImage = "https://fuchsia-defeated-ermine-208.mypinata.cloud/ipfs/QmdztjsyvKcLzjpcAfN2yWEgrGc46vAyKTUGZ6aYFCStu3/1.png";
    string ethImage = "https://fuchsia-defeated-ermine-208.mypinata.cloud/ipfs/QmdztjsyvKcLzjpcAfN2yWEgrGc46vAyKTUGZ6aYFCStu3/2.png";
    string linkImage = "https://fuchsia-defeated-ermine-208.mypinata.cloud/ipfs/QmdztjsyvKcLzjpcAfN2yWEgrGc46vAyKTUGZ6aYFCStu3/3.png";

    uint currentTokenId = 0;


    constructor() ERC721("MarketClash", "MK") {
        priceFeedBtc = AggregatorV3Interface(btcuscAddress);
        priceFeedETH = AggregatorV3Interface(ethusdAddress);
        priceFeedLink = AggregatorV3Interface(linkusdAddress);
    }



   //function generate a Card 
   
    function mint(
        address to, 
        Class _class
        ) 
    public returns (uint256 _tokenIdMinted) {
        require(_class == Class.Btc || _class == Class.Eth || _class == Class.Link, "Invalid class");
        currentTokenId++;
        uint tokenId = currentTokenId;
        uint256 attack;
        uint256 defence;

         if(_class == Class.Btc) {
            attack = getStatBtc(lowMultiplier);
            defence = getStatBtc(highMultiplier);
            tokenIdAttack[tokenId] = attack;
            tokenIdDefense[tokenId] = defence;
            classMapping[tokenId] = "Btc";
            imageMapping[tokenId] = btcImage;
         } else if (_class == Class.Eth) {
            attack = getStatETH(mediumMultiplier);
            defence = getStatETH(mediumMultiplier);
            tokenIdAttack[tokenId] = attack;
            tokenIdDefense[tokenId] = defence;
            classMapping[tokenId] = "Eth";
            imageMapping[tokenId] = ethImage;
         } else if (_class == Class.Link){
            attack = getStatLink(highMultiplier);
            defence = getStatLink(lowMultiplier);
            tokenIdAttack[tokenId] = attack;
            tokenIdDefense[tokenId] = defence;
            classMapping[tokenId] = "Link";
            imageMapping[tokenId] = linkImage;
         }


         

    
        attributes[tokenId] = Attr(_class, uint8(attack), uint8(defence));
        _safeMint(to, tokenId);

        return _tokenIdMinted;
    }

    
    function createDeck(uint[] calldata _arrayOfCards) public {
         require(_arrayOfCards.length == 3, "Deck size must be 3");
         require(ownerOf(_arrayOfCards[0]) == msg.sender, "You must own the card to add it to deck");
         require(ownerOf(_arrayOfCards[1]) == msg.sender, "You must own the card to add it to deck");
         require(ownerOf(_arrayOfCards[2]) == msg.sender, "You must own the card to add it to deck");

        deckOfPlayer[msg.sender] = _arrayOfCards;
        
    }

    function openPack(Class _firstCardClass, Class _secondCardClass, Class _thirdCardClass) public {
      
        uint firstCardTokenId = mint(msg.sender, _firstCardClass);
        uint secondCardTokenId = mint(msg.sender, _secondCardClass);
        uint thirdCardTokenId = mint(msg.sender, _thirdCardClass);
        uint [] memory pack = new uint[](3);
        pack[0] = firstCardTokenId;
        pack[1] = secondCardTokenId;
        pack[2] = thirdCardTokenId;

        recentOpenedPackByPlayer[msg.sender] = pack;

       emit openedPackByPlayer(firstCardTokenId, secondCardTokenId, thirdCardTokenId);
    
    } 



    function getStatBtc(uint multiplier) public view returns(uint256) {
        // BTC ATTACK = LOW
        // BTC DEFENSE = HIGH

        uint256 btcPrice = getBtcPrice();
        
        uint8[] memory arrayOfNumbers = uintToArray(btcPrice);


        uint number1 = arrayOfNumbers[0];
        uint number2 = arrayOfNumbers[1];
        uint number3 = arrayOfNumbers[2];
        uint number4 = arrayOfNumbers[3];

        uint stat = (number1 + number2 + number3 + number4) * multiplier;

        return stat;
    }


        function getStatETH(uint multiplier) public view returns(uint256) {
        // ETH ATTACK = MEDIUM
        // ETH DEFENSE = MEDIUM
        
        uint256 ethPrice = getETHPrice();
        
        uint8[] memory arrayOfNumbers = uintToArray(ethPrice);


        uint number1 = arrayOfNumbers[0];
        uint number2 = arrayOfNumbers[1];
        uint number3 = arrayOfNumbers[2];
        uint number4 = arrayOfNumbers[3];

        uint stat = (number1 + number2 + number3 + number4) * multiplier;

        return stat;
    }

       function getStatLink(uint multiplier) public view returns(uint256) {
        // LINK ATTACK = HIGH
        // LINK DEFENSE = LOW
        
        uint256 linkPrice = getLinkPrice();
        
        uint8[] memory arrayOfNumbers = uintToArray(linkPrice);


        uint number1 = arrayOfNumbers[0];
        uint number2 = arrayOfNumbers[1];
        uint number3 = arrayOfNumbers[2];
        uint number4 = arrayOfNumbers[3];

        uint stat = (number1 + number2 + number3 + number4) * multiplier;

        return stat;
    }




  
  //METADATA
  
   
    function tokenURI(uint256 tokenId) override(ERC721, ERC721URIStorage) public view returns (string memory) {
        string memory json = Base64.encode(
            bytes(string(
                abi.encodePacked(
                    '{"name": "', uint2str(tokenId), '",',
                    '"image": "', imageMapping[tokenId], '",',
                    '"attributes": [{"trait_type": "Class", "value": ', classMapping[tokenId], '},',
                    '{"trait_type": "Attack", "value": ', uint2str(attributes[tokenId].attack), '},',
                    '{"trait_type": "Defence", "value": ', uint2str(attributes[tokenId].defence), '},',
                    ']}'
                )
            ))
        );
        return string(abi.encodePacked('data:application/json;base64,', json));
    }


    //helper functions

       //Get prices function

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



    
        function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

         // Function to convert a uint to an array of its digits
    function uintToArray(uint256 number) public pure returns (uint8[] memory) {
        uint8[] memory digits = new uint8[](getNumDigits(number));

        for (uint256 i = digits.length; i > 0; i--) {
            digits[i - 1] = uint8(number % 10);
            number /= 10;
        }

        return digits;
    }

    // Function to calculate the number of digits in a uint
    function getNumDigits(uint256 number) internal pure returns (uint256) {
        uint256 digits = 0;
        while (number != 0) {
            number /= 10;
            digits++;
        }
        return digits;
    }

   // The following functions are overrides required by Solidity.

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