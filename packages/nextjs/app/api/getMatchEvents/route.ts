// api > hello > route.ts
import axios from 'axios'
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const response = await axios.get(
            'https://api.covalenthq.com/v1/scroll-sepolia-testnet/events/topics/0x46eb6608276541428f87b50f28308d490578215dff37471f69c923a91573285d/?starting-block=earliest&ending-block=latest',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${process.env.NEXT_PUBLIC_COVALENT_KEY}`
                }
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching data:', error);
        return NextResponse.error();
    }
}