export function checkIfHistory(timestamp: string) {
	const today = new Date();
	const check = new Date(timestamp);
	if (check < today) {
		return true;
	}
	return false;
}
