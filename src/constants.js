const c = {
    // REDIRECT_URI: "https%3A%2F%2Fkairos-core-airdrop.web.app%2F", // https://kairos-core-airdrop.web.app/
    // REDIRECT_URI: "http%3A%2F%2F192.168.1.101%3A8080%2F", // http://192.168.1.101:8080/

    VERSION: "Debug Version 13",
    NFT_TITLE: "New Beach",
    NFT_DESCRIPTION: 'The Voyager also known as Silver Slugs or Vic is an artist that specializes in futuristic art works. Most of his works are animated 3D models revolving around the astronaut and cyberpunk theme but he also does 2D and GAN art.',
    POLICY_ID: "9d53f82c2ee0a83bd724d90dd74109766035204b0d30a82b96c4c99e",
    POLICY_SCRIPT: '8201818200581cd086c23b5df51f80ed86f8199897bd4f8b7e9070783d65d3a6848125',
    API_ENDPOINT: 'https://discord.com/api/v8',
    CLIENT_ID: '958330731543822396',
    COOKIE_KEY: "sessionID",
    CURRENT_NFT_TYPE: 'AirdropEdition1', // For endpoint 2
    EDITIONS: ['Blue', 'Ruby', 'Gold', 'Silver', 'Bronze', 'Black', 'White'],
    AIRDROP_PROBABILITIES: {
        BLUE:0.75,
        RUBY:1.00,
        GOLD:0.30,
        SILVER:0.75,
        BRONZE:0.50,
        BLACK:0.00,
        WHITE:0.30
    },
    BLOCKFROST_API_KEY: {
        0: "testnetbKvUfObsMyfxVhcPUvyOT2E60VKErCDs", // (jeremyamon@gmail.com)
        1: "mainnetywgBm2bioxel7dRVtJcq9ofkNjMibtop" // (jdamon@up.edu.ph)
    },
    FORCE_DISCORD_ID: '' // Force to use this discord ID
    // id,tag,address,stake_address,status,verify_ada,register_time,blue,ruby,gold,silver,bronze,black,white,total,airdrop,airdrop_taken
    // 476332808642625546,Draku | Wild Dawgz#0195,addr1qyrw37qt08xuuanrar6pq3qcturg2te6v0vh7x2j63hpcn52pvj0w7kdrgn67dztwf7frqkf3hv5r06h6n2c4mazvyss2303rw,stake1ux9qkf8h0tx35fa0x39hyly3stycmk2phataf4v2a73xzgg7z2cve,verified,4.875752,1648150597,0,0,0,0,0,0,2,2,0,0
    // 951290948955025469,Dev showtime#0322,addr1q8w4u8zarjqsgadhhw03f709ef8tlpqznpx06ncpzs9pgv0pvp3qyw2z2pd36665c3xw6ype5t8smyusr38msvawq04qrep9xg,stake1u8skqcsz89p9qkcadd2vgn8dzqu69ncdjwgpcnacxwhq86sdmkz6u,verified,3.723249,1648203927,0,0,0,0,0,0,0,0,0,0
    // 784015559003078657,angel-l#0189,addr1q9ueag668f5tchdszlxfg98mvhj5qc6a5n9957e9vn9w5trgnc0ds6x9y33pp5v40t0nv7095jqhk63xcnuz8zl57dgszsse0h,stake1u95fu8kcdrzjgcss6x2h4hek08j6fqtmdgnvf7pr3060x5gjrh8ug,verified,2.24526,1647597629,0,0,0,0,0,1,3,4,2,0
    // 374877732594778113,Em-City NFTs#7835,addr1q96vr6gkzuw0e377cu5zhkc9zpxjq63852lkzm6nkx6wwkzn9usuwkurru56a32d5a8np9fvmyj0yq8g35x3fyurmfqslz5tnq,stake1u9fj7gw8twp372dwc4x6wnesj5kdjf8jqr5g6rg5jwpa5sgqaajz7,verified,3.140486,1647611135,0,0,0,1,0,1,0,2,0,0
    // 844193252119019602,treats#3601,addr1qxdm42yq70aul64vkhdsxv25t6vttqu2xcj39fs4tnrd6yk9cqmz5yf3tlnlpcnlsnepzg8f8xva88cvd08u2vpnv8usv2xkly,stake1u8zuqd32zyc4lelsuflcfus3yr5nnxwnnuxxhn79xqekr7gz9s6h4,verified,1.089253,1647405886,0,0,0,0,0,0,1,1,0,0
};
Object.freeze(c);

export default c;