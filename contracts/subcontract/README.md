This repo is a (WIP) state channel system to allow an advertiser and a publisher (or their agents) to synchronize their recorded advertising impressions in real-time.

Background
For traditional ad contracts with 30 to 60 day settlement cycles, discrepancies in impression reporting between parties are not discovered until the contract is complete. Discrepancies in tracked impressions commonly reach up to 20%. Some of these are intrinsic to browsers and networks and come from latency, network connection errors, ad blockers, and differences between ad server spam filtering techniques. The widespread acceptance of discrepancies across the industry, however, is exploited through fraudulent tampering of metrics and misreporting impressions.

By syncronizing impressions in real-time, discrepancies can be eliminated or at least discovered much more quickly.

State Channels
State Channels is a design pattern for building scalable decentralized applications. This documentation assumes familiarity with state channels. To review, check out the following links:

Martin Koeppelmann (Oct. 2015, blog) - How offchain trading will work
Robert Mccone (Oct. 2015, blog) - Ethereum Lightning Network and Beyond
Jeff Coleman (Nov. 2015, blog) - State Channels (see also: discussion on /r/ethereum)
Heiko Hees (Dec. 2015, talk) - Raiden: Scaling Out With Offchain State Networks
Jeff Coleman (Dec. 2015, interview) - Epicenter Bitcoin: State Networks
Jehan Tremback (Dec. 2015, blog) - Universal Payment Channels
Martin Koeppelmann (Jan. 2016, slides) - Scalability via State Channels
Vitalik Buterin (Jun. 2016, paper) - Ethereum: Platform Review (page 30)
Ameen Soleimani (Sept. 2016, talk) - An Introduction to State Channels in Depth
Jeff Coleman (ongoing, wiki) - State Channels Wiki
Jeff Coleman (ongoing, code) - Toy State Channels
Heiko Hees (ongoing, code) - Raiden Network
Sergey Ukustov (ongoing, code) - Machinomy
I especially recommend Jeff Coleman's blog post and the Machinomy documentation as starting points.

Usage
The advertiser or their agent (demand) and the publisher or their agent (supply) will maintain a state channel for the duration of their business relationship, periodically checkpointing the channel state onchain. All data can be kept private between the parties, even during checkpointing, unless there is a dispute.

This state channel tracks the impressions between demand and supply and can be thought of as an immutable "impression ledger". In response to browser ad impression events, the demand will send a signed state channel update over HTTP to the supply, acknowledging the impression. Both supply and demand store these channel updates offchain, in traditional databases such as PostgreSQL or MongoDB.

The Spruik  operator plays a role as a passive observer and a tie-breaker in the event the supply witnesses an impression event the demand fails to acknowledge.
