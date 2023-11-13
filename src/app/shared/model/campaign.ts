export interface Campaign {
    campaign_id: string;
    campaign_name: string;
    keywords: string[];
    amount: number;
    fund: number;
    status: boolean;
    town: string;
    radius: number;
    product_id: string;
    product_name: string;
}
