# Registration Progress Implementation

## Overview
This implementation adds functionality to track and resume incomplete registrations in the Anudha Mart app. When users return to the app, they can continue their registration from where they left off.

## API Integration
- **Endpoint**: `{{anudaMartServerBashURL}}/vendor/registration-progress/{identifier}`
- **Method**: GET
- **Identifier**: Can be email or phone number

### API Response Examples

**Success Response (with progress):**
```json
{
    "statusCode": 200,
    "success": true,
    "message": "User fetched successfully",
    "data": {
        "_id": "685b8cf088f91189362d15ce",
        "phone": "9649870669",
        "email": "r@gmail.com",
        "currentStep": 2,
        "isCompleted": false,
        "isPhoneVerified": true,
        ...
    }
}
```

**No Progress Response:**
```json
{
    "statusCode": 500,
    "success": false,
    "message": "No progress found"
}
```

## Step Navigation Mapping

| Step | Screen | Route |
|------|--------|-------|
| 1 | Registration | `/register` |
| 2 | KYC | `/kyc` |
| 3 | Company Registration | `/company-registration` |
| 4 | Company Details | `/company-details` |
| 5 | Shop/Company Address | `/shop-company-address` |
| 6 | Registration Success | `/register-success` |

## Implementation Details

### Files Created/Modified

#### New Files:
1. **`registration_progress_model.dart`** - Data models for API response
2. **`registration_progress_service.dart`** - Service to handle API calls
3. **`registration_navigation_helper.dart`** - Navigation utilities
4. **`registration_progress_manager.dart`** - High-level progress management

#### Modified Files:
1. **`login_screen.dart`** - Added progress check on startup and phone saving
2. **`register_form_viewmodel.dart`** - Enhanced email saving for progress tracking
3. **`kyc_form_viewmodel.dart`** - Added phone saving for progress tracking

### Key Features

#### 1. Automatic Progress Detection
- Checks for stored user identifiers (email/phone) in SharedPreferences
- Calls API to check registration progress on app startup
- Shows user-friendly dialog asking to continue or start over

#### 2. User Identifier Storage
- Email saved during registration screen (`user_email`, `registration_email`)
- Phone saved during KYC screen (`user_phone`)  
- Phone also saved when users enter it in login screen

#### 3. Smart Navigation
- Automatically navigates to the correct step based on `currentStep` from API
- Handles completed registrations by not showing continuation dialog
- Fallback navigation for unknown steps

#### 4. Dialog Interface
- User-friendly dialog asking whether to continue registration
- Shows current step name and progress information
- Options to "Continue" or "Start Over"

## Usage Examples

### From Login Screen
```dart
// Automatically called on login screen initialization
await _checkRegistrationProgress();
```

### From Any Screen
```dart
// Check and navigate if needed
await RegistrationProgressManager.checkAndNavigateIfNeeded(context);

// Check without UI interaction
bool hasIncomplete = await RegistrationProgressManager.hasIncompleteRegistration();
int? currentStep = await RegistrationProgressManager.getCurrentRegistrationStep();
```

### Manual Progress Check
```dart
final service = RegistrationProgressService();
final response = await service.checkStoredUserProgress();

if (response.success && response.data != null) {
    final progressData = response.data!;
    RegistrationNavigationHelper.navigateToCurrentStep(context, progressData);
}
```

## User Flow

1. **User opens app** → Login screen loads
2. **Progress check** → API call made with stored email/phone
3. **If progress found** → Dialog shown asking to continue
4. **User chooses "Continue"** → Navigate to appropriate step
5. **User chooses "Start Over"** → Stay on current screen
6. **User completes step** → Phone/email saved for future tracking

## Error Handling

- API errors are logged but don't interrupt user flow
- Missing identifiers result in no progress check
- Network errors fail silently, allowing normal app usage
- Malformed responses are handled gracefully

## SharedPreferences Keys

| Key | Purpose | Set During |
|-----|---------|------------|
| `user_email` | Progress tracking | Registration screen |
| `user_phone` | Progress tracking | KYC screen, Login screen |
| `registration_email` | KYC screen pre-fill | Registration screen |

## Future Enhancements

1. **Caching**: Add local caching of progress data
2. **Offline Support**: Handle offline scenarios
3. **Progress Indicators**: Visual progress bars
4. **Step Validation**: Validate that user can access specific steps
5. **Auto-save**: Periodically save progress during form filling
