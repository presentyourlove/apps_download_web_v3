// 型別定義
export interface Platform {
    type: string;
    version: string;
    downloadUrl?: string;
    storeUrl?: string;
    minSdk?: number;
    minOS?: string;
    size?: string;
    url?: string;
}

export interface Changelog {
    version: string;
    date: string;
    changes: string[];
}

export interface App {
    id: string;
    name: string;
    displayName: string;
    version: string;
    releaseDate: string;
    platforms: Record<string, Omit<Platform, 'type'>>;
    changelog: Changelog[];
}

export interface AppsData {
    lastUpdated: string;
    apps: App[];
}

// 資料獲取函式 (Build Time)
export async function getAppsData(): Promise<AppsData> {
    const response = await fetch(
        new URL('../../public/api/versions.json', import.meta.url)
    );
    return response.json();
}

// 輔助函式:將 platforms 物件轉為陣列
export function getPlatformsArray(app: App): Platform[] {
    return Object.entries(app.platforms).map(([type, details]) => ({
        type,
        ...details
    }));
}

// 輔助函式:依 ID 查詢應用程式
export function getAppById(apps: App[], id: string): App | undefined {
    return apps.find(app => app.id === id);
}
